import React from 'react';
import { useHistory } from 'react-router-dom';

import { toAbsoluteUrl } from '_metronic/_helpers';

import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';
import { Button } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import useTrans from 'helper/useTrans';

const Header = props => {
    const history = useHistory();
    const [trans] = useTrans();

    const goBack = () => {
        history.goBack();
    }

    return (
        <Card style={{ height: 'auto' }}>
            <CardHeader title={(
                <div>
                    <Button variant="link" onClick={goBack}>
                        <SVG src={toAbsoluteUrl(
                            '/media/svg/icons/Navigation/Arrow-left.svg'
                        )} />
                    </Button>
                        {trans("MENU.WAREHOUSE.PACK_BOX")}
                </div>
            )}>
            </CardHeader>
            <CardBody className="mention">
                <div className="title">* Ví dụ:</div>
                <div className="text-exg"> - Có 100 thùng với id [*********001] được lưu trữ ở pallet [P**]</div>
                <div className="text-exg"> - Nếu user muốn chọn 4 thùng để thực hiện gộp thùng, user phải thực hiện những bước sau: </div>
                <div className="step-exg"> + Trở lại bước lưu hàng</div>
                <div className="step-exg"> + Chọn pallet bất kỳ chứa thùng [*********001] cụ thể ở đây là pallet [P**]</div>
                <div className="step-exg"> + Giảm số lượng thùng [*********001] trên pallet xuống ít nhất [100 - 4 = 96 thùng]</div>
                <div className="step-exg"> + Quay trở lại bước đóng gói, lúc này user có thể tách 4 thùng ra khỏi 100 thùng để gộp thùng.</div>
                <div className="text-danger">* Các thùng được lấy ra thao tác không được nằm trên pallet nào.</div>
            </CardBody>
        </Card>
    );
};

Header.propTypes = {

};

export default Header;