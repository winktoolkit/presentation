/**
 * @author:
 * 	--> Jérôme GIRAUD
 */
pr.page3 = (function()
{
	var page3 = 
	{
		cube: null
	};
	
	/**
	 * 
	 */
	page3.init = function()
	{
		this.cube = new wink.ui.xyz.Cube(
		{
			faces: 
			[
				{ id: 1, faceId: 'face1' },
				{ id: 2, faceId: 'face2' },
				{ id: 3, faceId: 'face3' },
				{ id: 4, faceId: 'face4' },
				{ id: 5, faceId: 'face5' },
				{ id: 6, faceId: 'face6' }
			],
			size: 500,
			shiftX: 15,
			shiftY: 50,
			shiftZ: -500,
			observerX: 150,
			observerY: 150,
			axis: 'xy',
			focus: false,
			focusDuration: 500,
			dispatch: true,
			rotationCallback: null,
			rotationEndCallback: null
		});
		
		$('cube').appendChild(this.cube.getDomNode());
	};
	
	/**
	 * 
	 */
	page3.switchCube = function(e)
	{
		switch (e.target.value)
		{
			case '0':
				$('face1').innerHTML = '';
				$('face2').innerHTML = '';
				$('face3').innerHTML = '';
				$('face4').innerHTML = '';
				$('face5').innerHTML = '';
				$('face6').innerHTML = '';
				break;
			case '1':
				$('face1').innerHTML = '<img src="./images/page3/cover1.jpg" style="width: 500px; opacity: 0.7" >';
				$('face2').innerHTML = '<img src="./images/page3/cover2.jpg" style="width: 500px; opacity: 0.7" >';
				$('face3').innerHTML = '<img src="./images/page3/cover3.jpg" style="width: 500px; opacity: 0.7" >';
				$('face4').innerHTML = '<img src="./images/page3/cover4.jpg" style="width: 500px; opacity: 0.7" >';
				$('face5').innerHTML = '<img src="./images/page3/cover5.jpg" style="width: 500px; opacity: 0.7" >';
				$('face6').innerHTML = '<img src="./images/page3/cover6.jpg" style="width: 500px; opacity: 0.7" >';
				break;
			case '2':
				$('face1').innerHTML = '<video src="./resources/bunny.m4v" width="100%" height="100%" poster="./images/page3/poster2.png" onclick="this.play();"></video>';
				$('face2').innerHTML = '';
				$('face3').innerHTML = '<video src="./resources/sintel.mp4 " width="100%" height="100%" poster="./images/page3/poster1.png" onclick="this.play();"></video>';
				$('face4').innerHTML = '';
				$('face5').innerHTML = '';
				$('face6').innerHTML = '';
				break;
		}
	};
	
	return page3;
})();