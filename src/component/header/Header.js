import React from 'react';
import companylogo from '../../asset/image/eurowings.png'

const Header= () => {
	return (
		<div>
			<img data-testid="headerImg" src={companylogo} alt="Logo" />
		</div>
		
	)
}
export default Header

