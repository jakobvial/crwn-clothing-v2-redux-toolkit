import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import {selectCategoriesMap, selectIsCategoriesLoading} from "../../store/categories/category.selector";

import {CategoryContainer, Title} from "./category.styles";
import Spinner from "../../components/spinner/spinner.component";

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const {category} = useParams() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);
    const isLoading = useSelector(selectIsCategoriesLoading);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <Title>{category.toUpperCase()}</Title>
            {isLoading ?
                <Spinner/> :
                <CategoryContainer>
                    {products && products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </CategoryContainer>
            }
        </>
    );
};

export default Category;
