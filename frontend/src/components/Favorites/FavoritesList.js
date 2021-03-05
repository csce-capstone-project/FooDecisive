import React from 'react';
import './FavoritesList.css';
import {FavoritesDetail} from './FavoritesDetail';

export function FavoritesList(props) {
        return (
            <div className="BusinessList">
                {
                    props.businesses.map(business => {
                    return <FavoritesDetail business={business} key={business.id} isFavoritesList={true}/>;
                    })
                }
            </div>
        );
    }
