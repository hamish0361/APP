import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';
import { dialog } from 'app/components/DialogNotify';
import _ from 'lodash';

export const getAllPalletIDFromBoxList = createAsyncThunk(
    'warehouse/getAllPalletIDFromBoxList',
    async ({ sfa_id, ...params }, thunkAPI) => {
        return warehouseApi.pallet.fetchPallets({ with: 'location.shelve.area;pivotBoxes;type', search: `boxes.sfa_id:${sfa_id}`, ...params });
    }
);

export const updatePalletData = createAsyncThunk(
    'warehouse/updatePalletData',
    async ({ palletId, ...params }, thunkAPI) => {
        return warehouseApi.pallet.fetchPallet(palletId, { with: 'location.shelve.area;pivotBoxes;type', ...params })
    }
);

export const fetchBoxItemsOfCurrentBox = () => (dispatch, getState) => {
    const currentState = getState();
    const currentBox = currentState.warehouse.box.detail.data;
    let listBoxId = [currentBox?.id];

    if (currentBox?.childs?.length) {
        let listChildBoxId = currentBox.childs.reduce((p, c) => { p.push(c.id); return p; }, []);

        listBoxId = [...listBoxId, ...listChildBoxId];
    }

    dispatch(performEntryAction.fetchBoxItemsLoading());
    warehouseApi.boxItem.fetchBoxItems({
        appends: 'product.package',
        search: `box_id:${listBoxId.join(',')}`,
        searchFields: 'box_id:in',
        with: 'box',
    }).then((boxItemsResponse) => {
        if (boxItemsResponse.last_page > 1) {
            return Promise.all(_.range(2, boxItemsResponse.last_page + 1, 1).map((page) => {
                return warehouseApi.boxItem.fetchBoxItems({
                    appends: 'product.package',
                    search: `box_id:${listBoxId.join(',')}`,
                    searchFields: 'box_id:in',
                    with: 'box',
                    page
                })
            })).then(([...res]) => ([boxItemsResponse, ...res]))
        }

        return [boxItemsResponse];
    }).then((rawServerData) => {
        dispatch(performEntryAction.fetchBoxItemsFinish(rawServerData.reduce((prevV, curV) => ([...prevV, ...curV.data]), [])));
    });
}

const initialState = {
    steps: [
        'warehouse.warehouse',
        'warehouse.check_goods',
        'warehouse.storage_goods',
        'warehouse.packing_goods'
    ],
    storage: {
        pallets: {
            data: [],
            loading: false,
            pagination: {
                page: 1,
                limit: 15,
                total: 0,
                lastPage: 0
            }
        },
        currentPallet: undefined,
    },
    packaging: {
        childrens: []
    },
    checking_goods: {
        loading: false,
        is_checking: false,
        box_items: []
    }
};

const performEntrySlice = createSlice({
    name: 'performEntry',
    initialState,
    reducers: {

        /** STORAGE Actions */

        setListPallets(state, action) {
            state.storage.pallets.data = action.payload;
        },
        setListPalletsPagination(state, action) {
            state.storage.pallets.pagination.page = 1;
            state.storage.pallets.pagination.limit = action.payload.per_page;
            state.storage.pallets.pagination.total = action.payload.total;
            state.storage.pallets.pagination.lastPage = action.payload.last_page;
        },
        setListPalletsPage(state, action) {
            state.storage.pallets.pagination.page = action.payload;
        },
        setCurrentPallet(state, action) {
            state.storage.currentPallet = action.payload;
        },
        setLoadingListPallet(state, action) {
            state.storage.pallets.loading = action.payload;
        },
        resetStorage(state) {
            state.storage = initialState.storage
        },
        addPalletToList(state, action) {
            state.storage.pallets.data.unshift(action.payload);
        },
        updateCurrentPallet(state, action) {
            state.storage.currentPallet = { ...state.storage.currentPallet, ...action.payload };

            let matchedPalletIdx = _.findIndex(state.storage.pallets.data, ['id', state.storage.currentPallet.id]);

            if (matchedPalletIdx !== -1) state.storage.pallets.data[matchedPalletIdx] = state.storage.currentPallet;
        },

        /** END STORAGE Actions */

        /** PACKAGING Actions */

        addTempChildBox(state, action) {

            const matchedChildIdx = _.findIndex(state.packaging.childrens, ['id', action.payload.id]);

            if (matchedChildIdx === -1) state.packaging.childrens.push({ ...action.payload, child_quantity: action.payload?.duplicate || 1 });
            else dialog.warning(`Thùng con đã được thêm trước đó`);
        },
        removeTempChildBox(state, action) {
            if (action.payload === 'all') state.packaging.childrens = [];
            else state.packaging.childrens = state.packaging.childrens.filter(i => i.id != action.payload); // eslint-disable-line
        },

        /** END PACKAGING Actions */

        /** CHECKING GOODS Actions */

        fetchBoxItemsLoading(state) {
            state.checking_goods.loading = true;
        },

        fetchBoxItemsFinish(state, action) {
            state.checking_goods.loading = false;
            state.checking_goods.box_items = action.payload;
            state.checking_goods.is_checking = false;
        },

        addBoxItem(state, action) {
            state.checking_goods.box_items.unshift(action.payload);
            state.checking_goods.is_checking = true;
        },

        updateQuantityBoxItem(state, action) {
            let { rowIdx, quantity } = action.payload;

            state.checking_goods.box_items[rowIdx].quantity = quantity;
            state.checking_goods.is_checking = true;
        },

        updateExpiryDateBoxItem(state, action) {
            let { rowIdx, expiry_date } = action.payload;

            state.checking_goods.box_items[rowIdx].expiry_date = expiry_date;
            state.checking_goods.is_checking = true;
        },

        deleteBoxIem(state, action) {

            let {isRespectRedux, rowIdx} = action.payload;

            state.checking_goods.box_items.splice(rowIdx, 1);
            if(isRespectRedux) state.checking_goods.is_checking = true;
        }

        /** END CHECKING GOODS Actions */

    },
    extraReducers: {
        [getAllPalletIDFromBoxList.pending]: (state, action) => {
            state.storage.pallets.loading = true;

            return;
        },
        [getAllPalletIDFromBoxList.fulfilled]: (state, action) => {
            state.storage.pallets.data = action.payload.data;
            state.storage.pallets.pagination.total = action.payload.total;
            state.storage.pallets.pagination.limit = action.payload.per_page;
            state.storage.pallets.pagination.lastPage = action.payload.last_page;
            state.storage.pallets.loading = false;

            if (action.payload.data.length) {
                state.storage.currentPallet = action.payload.data[0];
            }

            return;
        },
        [getAllPalletIDFromBoxList.rejected]: (state, action) => {
            state.storage.pallets.data = [];
            state.storage.pallets.loading = false;
            state.storage.currentPallet = undefined;

            return;
        },

        [updatePalletData.pending]: (state, action) => {
            state.storage.pallets.loading = true;

            return;
        },
        [updatePalletData.fulfilled]: (state, action) => {
            state.storage.pallets.loading = false;

            // Kiểm tra xem đã có pallet trên list hay chưa
            const matchedPalletInList = _.findIndex(state.storage.pallets.data, ['id', action.payload.id]);

            // Nếu chưa có thì làm cho nó có 1 cái
            if (matchedPalletInList === -1) {
                state.storage.pallets.data.unshift(action.payload);
            } else {
                state.storage.pallets.data[matchedPalletInList] = action.payload;
            }

            // Xong r thì set_current pallet cho nó luôn
            state.storage.currentPallet = action.payload;

            return;
        },
        [updatePalletData.rejected]: (state, action) => {
            state.storage.pallets.loading = false;

            dialog.error('Get pallet failure');

            return;
        },

        [fetchBoxItemsOfCurrentBox.pending]: (state, action) => {
            state.list.loading = true;

            state.list.data = [];
            state.list.pagination.total = 0;
        },
        [fetchBoxItemsOfCurrentBox.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;

            state.list.loading = false;
            state.list.pagination.limit = action.payload.per_page;
            state.list.pagination.total = action.payload.total;
            state.list.pagination.lastPage = action.payload.last_page;

            return;
        },
        [fetchBoxItemsOfCurrentBox.rejected]: (state, action) => {
            state.list.data = [];
            state.list.pagination.total = 0;

            state.list.loading = false;

            return;
        },
    }
});

export const performEntryAction = performEntrySlice.actions;

const performEntryReducer = performEntrySlice.reducer;

export default performEntryReducer;
