import React, { useEffect, useState } from 'react';
import { I2cAvatar, I2cDropdown, I2cMenuItem, I2cButton } from '@webcomponents/i2cwebcomponents/dist/react';
import { CloseCircle, More, TickCircle } from 'iconsax-react';
import classes from "./SupervisorLeaveStyle.module.css";
import Toaster from '../../../common/Toaster/Toaster';

export const SupervisorLeaveGrid = (props: any) => {
	let dataSets: any;
	dataSets = props.data;
	const [toggleToaster, setToggleToaster] = useState(false);
	const [toggleType, setToggleType] = useState('success');
	const [toasterContent, setToasterContent] = useState(
		{
			heading: '',
			subHeading: ''
		}
	);

	// Edit 
	const Edit = (e: any) => {
		alert("Popup");
	}

	// Delete
	const Delete = (e: any) => {
		alert("Popup");
	}

	// Handler
	const handleClick = (e: any) => {
		alert("Popup");
	}
	const onCloseToast = () => {
		setToggleToaster(false)
	}

	useEffect(() => {

	}, [])

	return (
		<>
			<div className={classes.supervisorLeave}>
				<div className={`col-md-12 ${classes.gridMoreBtn}`}>
					<I2cDropdown>
						<I2cButton slot="trigger"><More size="18" color="#000" /></I2cButton>
						<I2cMenuItem onClick={handleClick}>Approve All</I2cMenuItem>
						<I2cMenuItem onClick={handleClick}>Reject All</I2cMenuItem>
					</I2cDropdown>
				</div>
				<div className='grid-container'>

					{dataSets.map((dataSet: any, index: any) => {
						return (
							<React.Fragment key={index}>
								<div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
									<div className='component-grid'>
										<table className='component-grid-table'>
											<tbody className='component-grid-tbody'>
												<tr>
													<td className='component-grid-td'>
														<div className="d-flex align-items-center">
															<I2cAvatar
																className={`me-3 ${classes['dispute-avatar']}`}
																image={dataSet.image}
																label="Avatar"
															/>
															<div className={classes.avatarInfo}>
																<h5>{dataSet.agent_name}</h5>
																{dataSet.ticket_number}
															</div>
														</div>
													</td>
													<td className='component-grid-td'>
														<h5>Location</h5>
														{dataSet.city}
													</td>
													<td className='component-grid-td text-end'>
														<div className='hourCalendar'>
															<span className="value">{dataSet.hour}</span>
															<span className="unit">Hrs</span>
														</div>
													</td>
												</tr>

												<tr>
													<td className='component-grid-td'>
														<h5>Start Date &amp; Time</h5>
														{dataSet.start_date}
													</td>
													<td className='component-grid-td' colSpan={2}>
														<h5>Stop Date &amp; Time</h5>
														{dataSet.stop_date}
													</td>
												</tr>

												<tr>
													<td className='component-grid-td' colSpan={3}>
														<h5>Reason</h5>
														{dataSet.reason}
													</td>
												</tr>

												<tr>
													<td className='component-grid-td' colSpan={3}>
														<h5>Notes</h5>
														{dataSet.notes}
													</td>
												</tr>

												<tr>
													<td className='component-grid-td' colSpan={2}>
														<span className={"status-badge status" + dataSet.status}>{dataSet.status}</span>
													</td>

													{/* <td className="text-right"><TickCircle size="18" color="#666666" onClick={(e) => Edit(dataSet.id)} /> <CloseCircle size="18" color="#666666" onClick={(e) => Delete(e)} /></td> */}
													<td className="component-grid-td text-right">
														<TickCircle className="cursor-pointer me-2" size="20" color="#70728F" onClick={() => { setToggleToaster(true); setToggleType('success'); setToasterContent({ heading: "Request Approved Successfully!", subHeading: "You have approved the leave request successfully." }); }} />
														<CloseCircle className="cursor-pointer" size="20" color="#70728F" onClick={() => { setToggleToaster(true); setToggleType('error'); setToasterContent({ heading: "Request Rejected!", subHeading: "You have rejected a request." }) }} />
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</React.Fragment>
						)
					})}
				</div>
			</div>
			<div>
				{toggleToaster && <Toaster heading={toasterContent.heading} subHeading={toasterContent.subHeading} type={toggleType} closeToaster={onCloseToast} />}
			</div>
		</>
	);

}

export default SupervisorLeaveGrid;
