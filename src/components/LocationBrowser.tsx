import React, { useState, useEffect, useCallback } from 'react';
import { LocationSelect } from './LocationSelect';
import { Utils } from '../Utils';
import { Card } from 'antd';

import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { configStore } from '../stores'




const LocationBrowser = observer(() => {
    const [stateData, setStateData] = useState<IState[]>([]);

    const countryStore = useContext(configStore);

    // workaround for react warnings
    const loadCountryData = useCallback(() => {
        countryStore.loadFromApi();
    }, [countryStore])
    
    
    //* Load countries on first render
    useEffect(() => {
        loadCountryData();
    }, [countryStore.countries]);

    const onCountryChange = async (id: number) => {

        // get code
        let countryCode = countryStore.countries.find(c => c.id === id)?.code;
        // sanity check
        if (!countryCode) {
            console.log("No country code found for id: " + id);
            return;
        }
        // get states
        let response = await fetch(`${countryStore.apiUrl}countries/${countryCode}/states`);
        let states: IState[] = await response.json();
        states.sort(Utils.compareLocation);
        setStateData(states);

    }

    return (
        <Card className="databox" title="Browse Countries and States">
            <LocationSelect onRefreshRequest={countryStore.loadFromApi} onLocationChange={onCountryChange} locationData={countryStore.countries} locationType="country" />
            {stateData.length === 0 ? '' : <LocationSelect onLocationChange={()=>{}} locationData={stateData} locationType="state" />}
        </Card>
    );

});

export default LocationBrowser;

