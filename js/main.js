/**
 * Main namespace
 * 
 * @author:
 * 	--> Jérôme GIRAUD
 * 
 */
var pr =
{
	currentPage: 0,
	
	_wh: 0,
	_ww: 0,
	_h: 0,
	_w: 0
};

/**
 * 
 */
window.onload = function()
{
	pr.main.init();
};

/**
 * 
 */
pr.main = (function()
{
	var main = 
	{
		pages:
		[
		 	'page0', 
		 	'page1', 
		 	'page2', 
		 	'page3', 
		 	'page4', 
		 	'page5', 
		 	'page6', 
		 	'page7', 
		 	'page8', 
		 	'page9', 
		 	'page10', 
		 	'page11'
		 ]
	};
	
	/**
	 * 
	 */
	main.init = function()
	{
		wink.subscribe('/window/events/orientationchange', {context: this, method: 'updateOrientation'});
		
		this.sizeElements();
		this.positionElements();
		
		pr.navigation.init();
		
		pr.page3.init();
		pr.page4.init();
		pr.page5.init();
		pr.page6.init();
		pr.page7.init();

		$('container').style.visibility = 'visible';
		
		 scrollTo(0, 0, 0);
	};
	
	/**
	 * 
	 */
	main.updateOrientation = function()
	{
		this.sizeElements();
		this.positionElements();
	};
	
	/**
	 * 
	 */
	main.sizeElements = function()
	{
		if ( !wink.ua.isIPad )
		{
			pr._wh = 768;
			pr._ww = 1024;
			
			pr._h = 691;
			pr._w = 921;
			
			$('container').style.height = pr._wh + 'px';
			$('container').style.width = pr._ww + 'px';
			
			$('container').style.margin = 'auto';
			$('container').style.top = (window.innerHeight - pr._wh)/2 + 'px';
		} else
		{
			pr._wh = window.innerHeight;
			pr._ww = window.innerWidth;
			
			pr._h = Math.floor((pr._wh/100) * 90);
			pr._w = Math.floor((pr._ww/100) * 90);
			
			$('container').style.height = pr._wh + 'px';
		}
	};
	
	/**
	 * 
	 */
	main.positionElements = function()
	{
		for ( var i in this.pages)
		{
			$(this.pages[i]).style.height = pr._h + 'px';
			
			if ( i == 0 )
			{
				$(this.pages[i]).translate(0, ((pr._wh - pr._h)/2));
			} else
			{
				$(this.pages[i]).translate(0, ((pr._wh - pr._h)/2)* (i*2 + 1));
			}
		}
	};
	
	return main;
})();