import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '_metronic/_partials/controls';

function Information({ userInfor }) {
    return (
        <Card>
			<CardHeader title="User Information" />
            <CardBody>
				<div className="d-flex align-items-center">
					<div className="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center">
						<div 
							className="symbol-label" 
							style={
								{
									backgroundImage: 
									'url(https://keenthemes.com/metronic/theme/html/demo4/dist/assets/media/users/300_21.jpg)'
								}
							}
						/>
					</div>
				</div>

				<div className="py-9">
					<div className="d-flex align-items-center justify-content-between mb-2">
						<span className="font-weight-bold mr-2">Email:</span>
						<span className="text-muted text-hover-primary">{userInfor?.email}</span>
					</div>
					<div className="d-flex align-items-center justify-content-between mb-2">
						<span className="font-weight-bold mr-2">Role:</span>
						<span className="text-muted text-hover-primary">{userInfor?.role}</span>
					</div>
					<div className="d-flex align-items-center justify-content-between mb-2">
						<span className="font-weight-bold mr-2">Status:</span>
						<span className="text-muted text-hover-primary">{userInfor?.status}</span>
					</div>
				</div>

				<div className="navi navi-bold navi-hover navi-active navi-link-rounded">
					<div className="navi-item mb-2">
						<NavLink to='/auth-service/profile/password' className="navi-link py-4" activeClassName='active'>
							<span className="navi-icon mr-2">
								<span className="svg-icon">
									<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
										<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
											<rect x="0" y="0" width="24" height="24"></rect>
											<path d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z" fill="#000000" opacity="0.3"></path>
											<path d="M12,11 C10.8954305,11 10,10.1045695 10,9 C10,7.8954305 10.8954305,7 12,7 C13.1045695,7 14,7.8954305 14,9 C14,10.1045695 13.1045695,11 12,11 Z" fill="#000000" opacity="0.3"></path>
											<path d="M7.00036205,16.4995035 C7.21569918,13.5165724 9.36772908,12 11.9907452,12 C14.6506758,12 16.8360465,13.4332455 16.9988413,16.5 C17.0053266,16.6221713 16.9988413,17 16.5815,17 C14.5228466,17 11.463736,17 7.4041679,17 C7.26484009,17 6.98863236,16.6619875 7.00036205,16.4995035 Z" fill="#000000" opacity="0.3"></path>
										</g>
									</svg>
								</span>
							</span>
							<span className="navi-text font-size-lg">Change Password</span>
						</NavLink>
					</div>
				</div>
			</CardBody>
        </Card>
    );
}

export default Information;
