import React from 'react';
import './FavoritesList.css';
import {Detail} from './Detail';

export function List(props) {
        return (
            <div className="BusinessList">
                {
                    props.businesses.map(business => {
                    return <Detail business={business} key={business.id}/>;
                    })
                }
            </div>
        );
    }
