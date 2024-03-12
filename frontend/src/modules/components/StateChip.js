import React from 'react';
import Chip from '@mui/material/Chip';
import {grey} from '@mui/material/colors';

const StateChip = ({ state }) => {
    const getStateChipProps = (state) => {
        switch (state) {
            case 0:
                return {
                    label: 'Pending',
                    color: 'default',
                    style: { backgroundColor: '#D5B02B', color: 'white' }
                };
            case 1:
                return {
                    label: 'Accepted',
                    color: 'default',
                    style: { backgroundColor: '#439a86', color: 'white' }
                };
            case 2:
                return {
                    label: 'Rejected',
                    color: 'default',
                    style: { backgroundColor: '#d71f89', color: 'white' }
                };
            default:
                return {
                    label: 'Unknown',
                    color: 'default',
                    style: { backgroundColor: grey[500], color: 'white' }
                };
        }
    };

    const chipProps = getStateChipProps(state);

    return <Chip {...chipProps} />;
};

export default StateChip;