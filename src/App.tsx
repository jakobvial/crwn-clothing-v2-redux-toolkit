import {lazy, Suspense, useEffect} from "react";
import {useDispatch} from "react-redux";

import {Route, Routes} from "react-router-dom";

import {createUserDocumentFromAuth, onAuthStateChangedListener} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.slice";
import {User} from "firebase/auth";
import Spinner from "./components/spinner/spinner.component";

const Home = lazy(() => import("./routes/home/home.component"));
const Authentication = lazy(() => import("./routes/authentication/authentication.component"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Navigation = lazy(() => import("./routes/navigation/navigation.component"));

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // note that an unsubscribe function is returned from the onAuthStateChangedListener
        return onAuthStateChangedListener((user) => {
            console.log("user", user);

            if (user) {
                createUserDocumentFromAuth(user);

                /*
                 Ternary operator and an immediately invoked function expression
                 (IIFE) to pick the properties we want from the user object
                */
                const pickedUser = (({accessToken, displayName, email}) => ({
                    accessToken,
                    displayName,
                    email
                }))(user as User & { accessToken: string });
                dispatch(setCurrentUser(pickedUser));
            } else {
                dispatch(setCurrentUser(null));
            }
        });
    }, []);

    return (
        <Suspense fallback={<Spinner/>}>
            <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route index element={<Home/>}/>
                    <Route path="shop/*" element={<Shop/>}/>
                    <Route path="auth" element={<Authentication/>}/>
                    <Route path="checkout" element={<Checkout/>}/>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
