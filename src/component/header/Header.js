import React from 'react';
import {eurowings} from '../../asset/index';

const Header= () => {
	return (
		<div>
			<img data-testid="headerImg" src={eurowings} alt="Logo" />
		</div>		
	)
}
export default Header

