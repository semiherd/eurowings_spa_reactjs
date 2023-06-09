import React from 'react';
import {facebook,twitter,instagram,linkedin,youtube} from '../../asset/index';

const social=[
	{id:'facebook', image: facebook, url:'https://www.facebook.com/eurowings.global/'},
	{id:'twitter', image: twitter, url:'https://twitter.com/eurowings'},
	{id:'instagram', image: instagram, url:'https://www.instagram.com/eurowings/'},
	{id:'linkedin', image: linkedin, url:'https://www.linkedin.com/company/eurowings-aviation-gmbh/'},
	{id:'youtube', image: youtube, url:'https://www.youtube.com/eurowings'},
]

const Footer= () => {
	return (
			<div className="footer">
				{social.map((item,index) => 
					<a key={index.toString()} data-testid={item.id} href={item.url} target="_blank" >	
						<img src={item.image} alt={item.id} />
					</a>
				)}
			</div>
	)
}
export default Footer

