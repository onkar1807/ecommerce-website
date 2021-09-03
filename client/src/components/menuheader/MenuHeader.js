import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCategoryAction } from '../../actions/categoryAction'
import './menuheader.css'

const MenuHeader = () => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategoryAction());
    },[])

    const renderCategories = (categories) => {

        let allCategories = [];
        for (let category of categories) {
            allCategories.push(
                <li key={category.name}>
                    {
                        category.parentId 
                        ? <a 
                            style={{cursor: "pointer"}} 
                            href={
                                `/${category.slug}?cid=${category._id}&type=${category.type}`
                                }
                            >
                                {category.name}
                        </a>
                        : <span>{category.name}</span>
                    }
                    {
                        category.children.length > 0
                        ? <ul>{renderCategories(category.children)}</ul>
                        : null
                    }
                </li>
            )
        }
        return allCategories;
    }

    return (
        <div className="menuHeader">
            <ul>{renderCategories(category.categories)}</ul>
        </div>
    )
}

export default MenuHeader
