import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {Route, Routes} from "react-router-dom";

import {createUserDocumentFromAuth, onAuthStateChangedListener} from "./utils/firebase/firebase.utils";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {setCurrentUser} from "./store/user/user.slice";
import {User} from "firebase/auth";

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
                }))(user as User & {accessToken: string});
                dispatch(setCurrentUser(pickedUser));
            } else {
                dispatch(setCurrentUser(null));
            }
        });
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path="shop/*" element={<Shop/>}/>
                <Route path="auth" element={<Authentication/>}/>
                <Route path="checkout" element={<Checkout/>}/>
            </Route>
        </Routes>
    );
};

export default App;
