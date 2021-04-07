import React from 'react';
import './RecsList.css';
import {RecsDetail} from './RecsDetail';

export function RecsList(props) {
        return (
            <div className="BusinessList">
                {
                    props.businesses.map(business => {
                    return <RecsDetail business={business} key={business.id} isFavoritesList={true}/>;
                    })
                }
            </div>
        );
    }
