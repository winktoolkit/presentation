/**
 * @author:
 * 	--> Jérôme GIRAUD
 */
pr.navigation = (function()
{
	var navigation = 
	{
		wheel: null
	};
	
	/**
	 * 
	 */
	navigation.init = function()
	{
		wink.ux.touch.addListener(wink.byId('next'), 'end', { context: this, method: 'next', arguments: null }, { preventDefault: false });
		wink.ux.touch.addListener(wink.byId('previous'), 'end', { context: this, method: 'previous', arguments: null }, { preventDefault: false });
		
		// Handle key events to navigate
		if ( !wink.ua.isMobile )
		{
			document.addEventListener('keyup', function(e)
			{
				if ( e.keyCode == '38' )
				{
					pr.navigation.previous();
				} else if ( e.keyCode == '40' )
				{
					pr.navigation.next();
				}
			}, false);
		}
		
		wink.fx.apply(wink.byId('pages'), 
		{
			"transition-duration": '800ms',
			"transition-timing-function": 'ease-out'
		});
		
		this.wheel = new wink.ui.xy.Wheel(
		{
			fadeInDelay: 400,
			fadeInOutDuration: 400,
			items: [
				{
					id: 1, 
					img: './images/wheel/petal_1.png' 
				},
				{
					id: 2, 
					img: './images/wheel/petal_2.png' 
				},
				{
					id: 3, 
					img: './images/wheel/petal_3.png' 
				},
				{
					id: 4, 
					img: './images/wheel/petal_4.png' 
				},
				{
					id: 5, 
					img: './images/wheel/petal_5.png'
				},
				{
					id: 6, 
					img: './images/wheel/petal_6.png' 
				},
				{
					id: 7, 
					img: './images/wheel/petal_7.png' 
				},
				{
					id: 8, 
					img: './images/wheel/petal_8.png' 
				},
				{
					id: 9, 
					img: './images/wheel/petal_9.png' 
				},
				{
					id: 10, 
					img: './images/wheel/petal_10.png' 
				},
				{
					id: 11, 
					img: './images/wheel/petal_11.png' 
				},
				{
					id: 12, 
					img: './images/wheel/petal_12.png' 
				}
			]
		});
		
		document.body.appendChild(this.wheel.getDomNode());
		wink.subscribe('/wheel/events/select', {method: 'goToPage', context: this});
	};
	
	/**
	 * 
	 */
	navigation.next = function()
	{
		this.goToPage(pr.currentPage+1);
	};
	
	/**
	 * 
	 */
	navigation.previous = function()
	{
		this.goToPage(pr.currentPage-1);
	};
	
	/**
	 * 
	 */
	navigation.goToPage = function(index)
	{
		if ( wink.isInteger(index) )
		{
			if ( index < 0 || index > 11 )
			{
				return
			}

			wink.fx.translate(wink.byId('pages'), 0, -index*pr._wh);

			if ( index > pr.currentPage )
			{
				this.wheel._positionPetals(360-30);
				this.wheel._updatePetalsPosition(360-30);
			} else
			{
				this.wheel._positionPetals(360+30);
				this.wheel._updatePetalsPosition(360+30);
			}
			
			pr.currentPage = index;
			
			if ( index == 5 )
			{
				pr.page6.listenToOrientationChange();
			} else
			{
				pr.page6.unListenToOrientationChange();
			}
		} else
		{
			wink.fx.translate(wink.byId('pages'), 0, -(index.selectedItem-1)*pr._wh);
			pr.currentPage = index.selectedItem-1;
		}
	};
	
	return navigation;
})();