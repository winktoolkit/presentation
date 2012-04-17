/**
 * @author:
 * 	--> Jérôme GIRAUD
 */
pr.page7 = (function()
{
	var page7 = 
	{
		_cursorBeginX: 0,
		_cursorPosition: 0,
		_cursorCurrentX: 0,
		_barWidth: 0
	};
	
	/**
	 * 
	 */
	page7.init = function()
	{
		wink.ux.touch.addListener(wink.byId('cursor'), "start", { context: this, method: "cursorStart", arguments: null }, { preventDefault: true });
		wink.ux.touch.addListener(wink.byId('progressBar'), "move", { context: this, method: "cursorMove", arguments: null }, { preventDefault: true });
		wink.ux.touch.addListener(wink.byId('cursor'), "end", { context: this, method: "cursorEnd", arguments: null }, { preventDefault: true });
	};
	
	/**
	 * 
	 */
	page7.cursorStart = function(event)
	{
		this._cursorBeginX = event.x;
		
		this._barWidth = window.getComputedStyle(wink.byId('progressBar'))['width'];
		this._barWidth = parseFloat(this._barWidth.substring(0, this._barWidth.length-2));
	};
	
	/**
	 * 
	 */
	page7.cursorMove = function(event)
	{
		this._cursorPosition = this._cursorCurrentX + event.x - this._cursorBeginX;
		
		if ( (this._cursorCurrentX + event.x - this._cursorBeginX) >= 0 && (this._cursorCurrentX + event.x - this._cursorBeginX) <= this._barWidth)
		{
			wink.fx.translate(wink.byId('cursor'), this._cursorPosition, 0);
			
			wink.byId('progress').style.width = (((this._cursorCurrentX + event.x - this._cursorBeginX)/this._barWidth)*100) + '%';
			
			
			if ( (this._cursorCurrentX + event.x - this._cursorBeginX) >= 0 && (this._cursorCurrentX + event.x - this._cursorBeginX) <= this._barWidth/5)
			{
				wink.byId('idea').style.opacity = 1 - ( (5/this._barWidth)*(this._cursorCurrentX + event.x - this._cursorBeginX));
			}
			
			if ( (this._cursorCurrentX + event.x - this._cursorBeginX) >= 0 && (this._cursorCurrentX + event.x - this._cursorBeginX) <= this._barWidth/5)
			{
				wink.byId('arrow1').style.opacity = (10/this._barWidth)*(this._cursorCurrentX + event.x - this._cursorBeginX) - 1;
			}
			
			if ( (this._cursorCurrentX + event.x - this._cursorBeginX) > this._barWidth/5 && (this._cursorCurrentX + event.x - this._cursorBeginX) <= (3*this._barWidth)/5)
			{
				wink.byId('arrow1').style.opacity = 2 - ( (5/this._barWidth)*(this._cursorCurrentX + event.x - this._cursorBeginX));
			}
			
			if ( (this._cursorCurrentX + event.x - this._cursorBeginX) >= (this._barWidth)/5 && (this._cursorCurrentX + event.x - this._cursorBeginX) <= (2*this._barWidth)/5)
			{
				wink.byId('concept').style.opacity = ((2*10)/(this._barWidth*3))*(this._cursorCurrentX + event.x - this._cursorBeginX) - 2;
			}
			
			if ( (this._cursorCurrentX + event.x - this._cursorBeginX) > (2*this._barWidth)/5 && (this._cursorCurrentX + event.x - this._cursorBeginX) <= (4*this._barWidth)/5)
			{
				wink.byId('concept').style.opacity = 3 - ( (5/this._barWidth)*(this._cursorCurrentX + event.x - this._cursorBeginX));
			}
			
			if ( (this._cursorCurrentX + event.x - this._cursorBeginX) >= (4*this._barWidth)/10 && (this._cursorCurrentX + event.x - this._cursorBeginX) <= (3*this._barWidth)/5)
			{
				wink.byId('arrow2').style.opacity = ((3*10)/(this._barWidth*5))*(this._cursorCurrentX + event.x - this._cursorBeginX) - 3;
			}
			
			if ( (this._cursorCurrentX + event.x - this._cursorBeginX) > (3*this._barWidth)/5 && (this._cursorCurrentX + event.x - this._cursorBeginX) <= (5*this._barWidth)/5)
			{
				wink.byId('arrow2').style.opacity = 4 - ( (5/this._barWidth)*(this._cursorCurrentX + event.x - this._cursorBeginX));
			}
			
			if ( (this._cursorCurrentX + event.x - this._cursorBeginX) >= (5*this._barWidth)/10 && (this._cursorCurrentX + event.x - this._cursorBeginX) <= (7*this._barWidth)/8)
			{
				wink.byId('portal').style.opacity = ((4*10)/(this._barWidth*7))*(this._cursorCurrentX + event.x - this._cursorBeginX) - 4;
			}
		}
	};
	
	/**
	 * 
	 */
	page7.cursorEnd = function(event)
	{
		this._cursorCurrentX = this._cursorPosition;
	};
	
	return page7;
})();