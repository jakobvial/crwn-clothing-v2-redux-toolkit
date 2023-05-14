import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';
import {setCategories, setCategoriesLoading} from "../../store/categories/category.slice";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCategoriesLoading());
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            dispatch(setCategories(categoriesArray));
        };
        getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=":category" element={<Category/>}/>
        </Routes>
    );
};

export default Shop;
