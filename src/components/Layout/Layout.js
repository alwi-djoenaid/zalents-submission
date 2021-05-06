import React from 'react';
import {withRouter} from 'react-router-dom';

// Component
import Appbar from './Appbar';
import Main from './Main';

import {makeStyles} from '@material-ui/core/styles';

const Layout = props => {
    return(
        <div>
            <Appbar />
            <Main>{props.children}</Main>
        </div>
    );
};

export default withRouter(Layout)