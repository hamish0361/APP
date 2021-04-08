import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import _ from 'lodash';
import useTrans from 'helper/useTrans';

import { Card } from '_metronic/_partials/controls';
import BoxItem from './BoxItem';

import './index.scss';

const headerHeight = 65;

const ListBox = ({ onSelectBox, showQuantity = () => false, showRelative = false, showTotalItems = false, showItems = false, externalLink }) => {

    const [searchText, setSearchText] = useState("");
    const sfa = useSelector(state => state.warehouse.sfa.detail.data);
    const cardRef = useRef();
    const listRef = useRef();
    const params = useParams();
    const listItemsRef = useRef();
    const [trans] = useTrans();

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleScroll = (e) => {
        const { top, height: wrapperHeight } = cardRef.current.getBoundingClientRect();
        const { height: contentHeight } = listRef.current.getBoundingClientRect();

        if (contentHeight > wrapperHeight) {
            listRef.current.style.top = '0px';
            listRef.current.style.bottom = '0px';

            return;
        }

        if (top <= headerHeight) {
            listRef.current.style.top = `${headerHeight - top}px`;
        } else {
            listRef.current.style.top = 0;
        }
    }

    const listBox = useMemo(() => {

        if (!sfa?.boxes?.length) return [];

        let boxList = [...sfa?.boxes];

        if (showRelative) {
            boxList = boxList.filter(b => !b.box_parent_id);
        }

        if (!searchText) return boxList;

        return boxList.sort((a, b) => {

            if (a.id.includes(searchText)) return -1;
            if (b.id.includes(searchText)) return 1;

            return 0;
        });
    }, [sfa?.boxes, searchText]); // eslint-disable-line

    const handleClickBox = (box) => {
        onSelectBox && onSelectBox(box);
    }

    const handleChangeSearchText = (e) => {
        listItemsRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        debounceSearchText(e.target.value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearchText = useCallback(_.debounce((v) => {
        setSearchText(v);
    }, 750), []); // eslint-disable-line

    const handleKeyPress = (e) => {
        if (e.charCode === 13 && searchText.length && listBox.length) {
            onSelectBox && onSelectBox(listBox[0]);
        }
    }

    return (
        <Card className="list-box-wrapper position-relative" ref={cardRef}>
            <div className="position-absolute list-box" ref={listRef}>
                <div className="title">{trans("warehouse.sku.list.title")}</div>
                <div className="search-box">
                    <input className="form-control" placeholder="Search here" onChange={handleChangeSearchText} onKeyPress={handleKeyPress} />
                </div>

                <div className="list-box-items" ref={listItemsRef}>
                    {listBox.map((box, idx) => (
                        <div className="position-relative" key={`box-${idx}`}>
                            <BoxItem
                                showItems={showItems}
                                showTotalItems={showTotalItems}
                                showRelative={showRelative}
                                showQuantity={showQuantity}
                                onClick={handleClickBox}
                                box={box}
                                active={box.id === params?.box_id}
                                key={`box-item-${idx}`}
                                externalLink={externalLink}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

ListBox.propTypes = {
    onSelectBox: PropTypes.func,
    showQuantity: PropTypes.func,
    showRelative: PropTypes.bool,
    showTotalItems: PropTypes.bool
};

export default ListBox;