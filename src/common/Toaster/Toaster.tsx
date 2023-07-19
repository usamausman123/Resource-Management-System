import { useEffect } from 'react';
import { CloseCircle, TickCircle } from 'iconsax-react';
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import classes from "./Toaster.module.css";

const Toaster = (props: any) => {
	const popToaster = () => {
		toast(
			<div className={`${classes.toastMain} ${props.type === "success" ? classes.success : classes.error}`}>
				{props.type === "success" ? <TickCircle size="33" color="#03C04A" variant="Bold" /> : <CloseCircle size="33" color="#EE4723" variant="Bold" />}
				<div className={classes.toastInner}>
					<div className={classes.toastBoldText}>{props.heading}</div>
					<div className={classes.toastLightText}>{props.subHeading}</div>
				</div>
			</div>,
			{
				onClose: () => {props.closeToaster()}
			}
		);
	}
	useEffect(() => {
		popToaster();
	}, []);
	
	return(
		<>
			<ToastContainer
				className={classes.toasterContainer}
				position="bottom-left"
				autoClose={4000}
				closeOnClick
				draggable={false}
				hideProgressBar={true}
				progressClassName={props.type === "success" ? classes.progressBarSuccess: classes.progressBarError}
			/>
		</>
	);
}

export default Toaster;