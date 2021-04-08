import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchDashboardBoxes = createAsyncThunk(
    'warehouse/dashboard_fetchBoxes',
    (params, thunkAPI) => {

        let myParams = {
            orderBy: 'created_at',
            sortedBy: 'desc',
            with: 'sfa;pivotPallets.pallet.location.shelve;owners.pivotLadingBills.ladingBill.containers;items',
            // criteria: 'inventory'
        }
        const currentFilter = thunkAPI.getState().warehouse.dashboard.filter;
        const pagination = thunkAPI.getState().warehouse.dashboard.pagination;

        myParams['page'] = pagination.page;

        if (Object.keys(currentFilter).length) {
            myParams['searchJoin'] = 'and';

            myParams['search'] = '';
            myParams['searchFields'] = '';

            Object.entries(currentFilter).forEach(([filterKey, value]) => {
                switch (filterKey) {
                    case 'date':
                        if (!value.startDate) {
                            myParams['search'] += `created_at:${value.endDate}`;
                            myParams['searchFields'] += `created_at:like;`
                        } else if (!value.endDate) {
                            myParams['search'] += `created_at:${value.startDate}`;
                            myParams['searchFields'] += `created_at:like;`
                        } else {
                            myParams['search'] += `created_at:${value.startDate},${value.endDate}`;
                            myParams['searchFields'] += `created_at:between;`
                        }

                        break;

                    default:
                        if(value) {
                            myParams['search'] += `${filterKey}:${value};`;
                            myParams['searchFields'] += `${filterKey}:=;`;
                        }
                        
                        break;
                }
            })
        }

        return warehouseApi.box.fetchBoxs(myParams);
    }
);

const initialState = {
    filter: {},
    boxes: [],
    pagination: {
        page: 1,
        total: 0,
        lastPage: 0,
    },
    loading: false,
    columns: [
        {
            id: 'sku',
            name: 'TT Thùng',
            show: true
        },
        {
            id: 'order',
            name: 'Đơn đặt hàng',
            show: true,
        },
        {
            id: 'pallets',
            name: 'Pallet',
            show: true,
        },
        {
            id: 'lading_bills',
            name: 'Vận đơn',
            show: true,
        },
    ]
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        changeFilter(state, action) {
            state.filter = { ...state.filter, ...action.payload };
            state.pagination.page = 1;
        },
        resetFilter(state) {
            state.filter = {};
            state.pagination.page = 1;
        },
        changePage(state, action) {
            state.pagination.page = action.payload;
        },
        resetBoxes(state) {
            state.boxes = [];
            state.pagination.page = 1;
        }
    },
    extraReducers: {
        [fetchDashboardBoxes.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchDashboardBoxes.fulfilled]: (state, action) => {
            state.boxes = state.boxes.concat(action.payload.data);
            state.pagination.total = action.payload.total;
            state.pagination.lastPage = action.payload.last_page;
            state.loading = false;

            return;
        },
        [fetchDashboardBoxes.rejected]: (state, action) => {
            state.list = [];
            state.loading = false;

            return;
        },
    },
});

const dashboardReducer = dashboardSlice.reducer;

export const dashboardAction = dashboardSlice.actions;

export default dashboardReducer;
