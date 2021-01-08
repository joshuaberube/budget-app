import { Route, Switch, useLocation, useRouteMatch } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Auth from "../Auth/Auth";
import Header from "../Header/Header";
import PageNotFound from "../shared/PageNotFound/PageNotFound";
import Resources from "../Resources/Resources";
import Transactions from "../Transactions/Transactions";
import Bills from "../Bills/Bills";
import AddBill from "../Bills/AddBill";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../Auth/ResetPassword/ResetPassword";
import { selectUserState } from '../../redux/slices/userSlice'
import { getTransactions } from '../../redux/slices/plaidSlice'
import Calculator from "../../components/Calculators/Mortgage_Calculator"
import Budget from '../Budget/Budget'
import history from "../../history"
import './App.scss'


const App = () => {
	const location = useLocation();
	const { isLoggedIn, user: { api_key }, status} = useSelector(selectUserState);
	const dispatch = useDispatch();
	const match = useRouteMatch("/reset/:resetPasswordToken");

	useEffect(() => {
		if (isLoggedIn && api_key) {
			dispatch(getTransactions());
		} else if (
			!isLoggedIn &&
			status !== "pending" &&
			location.pathname !== "/forgotpassword" &&
			!match
		) {
			history.push("/auth");
		}
	}, [isLoggedIn, dispatch, location.pathname, match, api_key, status]);

	return (
		<main className="font-proxima-nova">
			{location.pathname !== "/auth" ? <Header /> : null}
			<Switch>
				<Route exact path="/"><Transactions /></Route>
				<Route path="/auth"><Auth /></Route>
				<Route path="/goals"><Calculator /></Route>
				<Route path="/resources"><Resources /></Route>
				<Route path="/budget"><Budget /></Route>
				<Route path="/bills"><Bills /></Route>
				<Route path="/addbill"><AddBill /></Route>
				<Route path='/calculator'><Calculator/></Route>
				<Route path="/forgotpassword"><ForgotPassword /></Route>
				<Route path="/reset/:resetPasswordToken"><ResetPassword /></Route>
				<Route><PageNotFound /></Route>
			</Switch>
		</main>
	);
};

export default App