import React, { useState, useEffect } from 'react';
import { LocationSelect } from './LocationSelect';
import { Utils } from '../Utils';
import { Card } from 'antd';

import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { configStore } from '../stores'
import { trace } from 'console';
import { MobXGlobals } from 'mobx/dist/internal';



const LocationBrowser = observer(() => {

    const [selectedState, setSelectedState] = useState<number>(0);
    const [selectedCountry, setSelectedCountry] = useState<number>(0);
    const [stateData, setStateData] = useState<IState[]>([]);

    const countryStore = useContext(configStore);

    // load api data on first render
    useEffect(() => {
        countryStore.loadFromApi();
    }, []);


    const onCountryChange = async (id: number) => {

        setSelectedCountry(id);
        // get code
        let countryCode = countryStore.countries.find(c => c.id == id)?.code;
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
    const onStateChange = (id: number) => {
        setSelectedState(id);
    }

    return (
        <Card className="databox" title="Browse Countries and States">
            <LocationSelect onLocationChange={onCountryChange} locationData={countryStore.countries} locationType="country" />
            {stateData.length === 0 ? '' : <LocationSelect onLocationChange={onStateChange} locationData={stateData} locationType="state" />}
        </Card>
    );

});

export default LocationBrowser;

