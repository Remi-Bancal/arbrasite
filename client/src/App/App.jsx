import React from 'react';

import { ParasiteLists , ParasiteForm , EssenceList , EssenceForm , DisplayMushroom, ParasiteList } from '.';

class App extends React.Component {
    render() {
        return (
            <div>
                <ParasiteList/>
                <DisplayMushroom obj_id="1" />
            </div>
        );
    }
}

export { App }; 