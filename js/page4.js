/**
 * @author:
 * 	--> Jérôme GIRAUD
 */
pr.page4 = (function()
{
	var page4 = 
	{
		coverflow: null
	};
	
	/**
	 * 
	 */
	page4.init = function()
	{
		this.coverflow = new wink.ui.xyz.CoverFlow(
		{
			covers: 
			[
				{ image: './images/page4/cover0.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover1.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover2.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover3.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover4.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover5.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover6.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover7.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover8.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover9.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover10.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover11.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover12.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover13.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover14.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover15.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover16.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover17.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover18.jpg', title: '', backFaceId: 'backface1' },
				{ image: './images/page4/cover19.jpg', title: '', backFaceId: 'backface1' },
			],
			size: 300,
			viewportWidth: 700,
			reflected: true,
			displayTitle: false,
			fadeEdges: true,
			handleOrientationChange: true,
			handleGesture: true,
			backgroundColor: { r: 255, g: 255, b: 255 },
			coverSpacing: 30,
			displayTitleDuration: 1000,
			borderSize: 2
		});
		
		$('coverflow').appendChild(this.coverflow.getDomNode());
	};
	
	return page4;
})();