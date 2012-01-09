/*--------------------------------------------------------
 * Copyright © 2009 – 2010* France Telecom
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * Implements a wheel selector.
 * Displays a 12 petals, 'multi-touch' selection wheel
 * 
 * @properties:
 * 	data = 
 * 	{
 * 		fadeInDelay = the time in milliseconds after which the Wheel should be displayed  	
 * 		fadeInOutDuration = the fade in or out effect duration in milliseconds
 *		items = [
 *  		{
 *  			id = a unique identifier for the wheel item (will be returned if selected)
 *  			img = the images to be displayed 
 *			}
 *		]
 *	}
 *
 * @methods:
 *	--> getDomNode: return the main DOM node of the Wheel
 *
 * @attributes:
 * 	--> uId: unique identifier of the component
 *
 * @events
 * 	--> /wheel/events/select: the user selected a new item (return the id of the selected item)
 *
 * @dependencies:
 * 	--> wink.math._geometric
 * 
 * @compatibility
 *  --> Iphone OS2 (slow), Iphone OS3
 * 
 * @author:
 * 	--> Jerome GIRAUD
 */
wink.ui.xy.Wheel = function(properties)
{
	this.uId                = wink.getUId();
	
	this._properties        = properties;
	
	this._isTouch           = false;
	this._isGesture         = false;
	this._isDisplayed       = false;
	
	this._touchStartTimer   = null;
	this._touchEndTimer     = null;
	
	this._fadeInDelay       = 300;
	this._fadeInOutDuration = 300;
	
	this._items             = [];
	this._petals            = [];
	
	this._domNode           = null;
	
	if ( this._validateProperties() === false )return;

	this._initProperties();	
	this._initDom();
	this._initListeners();
};

wink.ui.xy.Wheel.prototype =
{
	/**
	 * return the main DOM node of the Wheel
	 */
	getDomNode: function()
	{
		return this._domNode;
	},
	
	/**
	 * The user touched the screen
	 * 
	 * @parameters:
	 * 	--> e: the start event
	 */
	_touchStart: function(e)
	{	
		if ( e.srcEvent.touches.length > 1 )
		{
			e.srcEvent.preventDefault();
		}
		
		if ( this._isTouch == false && e.srcEvent.touches.length == 1 )
		{
			this._isTouch = true;
			
			clearTimeout(this._touchEndTimer);
			
			this._domNode.style.display = 'block';
			//this._domNode.style.left = (e.x-this._petals[0].TRANSFORM_ORIGIN_X) + 'px';
			//this._domNode.style.top = (e.y-this._petals[0].TRANSFORM_ORIGIN_Y) + 'px';
			
			this._domNode.style.bottom = '-20px';
			this._domNode.style.right = '113px';
			
			this._touchStartTimer = wink.setTimeout(this, '_show', this._fadeInDelay);
		}
	},
	
	/**
	 * The user move a finger on the screen
	 * 
	 * @parameters:
	 * 	--> e: the move event
	 */
	_touchMove: function(e)
	{
		if ( e.srcEvent.touches.length > 1 || this._isDisplayed == true )
		{
			e.srcEvent.preventDefault();
		}
	},
	
	/**
	 * The user remove a finger from the screen
	 * 
	 * @parameters:
	 * 	--> e: the end event
	 */
	_touchEnd: function(e)
	{
		if ( e.srcEvent.touches.length > 0 || this._isDisplayed == true )
		{
			e.srcEvent.preventDefault();
		}
		
		if ( this._isTouch == true && e.srcEvent.touches.length == 0 )
		{
			clearTimeout(this._touchStartTimer);
		
			this._domNode.style.opacity = 0;

			this._touchEndTimer = wink.setTimeout(this, '_hide', this._fadeInOutDuration);
			
			if ( this._isGesture === true && this._isDisplayed === true)
			{
				this._getSelectedPetal();
				this._isGesture = false;
			}
			
			this._isTouch = false;
		}
	},
	
	/**
	 * The user touch the screen with 2 fingers
	 * 
	 * @parameters:
	 * 	--> e: the gesturestart event
	 */
	_gestureStart: function(e)
	{
		this._isGesture = true;
	},
	
	/**
	 * The user moved on the screen with 2 fingers
	 * 
	 * @parameters:
	 * 	--> e: the gesturemove event
	 */
	_gestureChange: function(e)
	{
		this._positionPetals(e.srcEvent.rotation);
	},
	
	/**
	 * The user finished his gesture
	 * 
	 * @parameters:
	 * 	--> e: the gestureend event
	 */
	_gestureEnd: function(e)
	{
		this._updatePetalsPosition(e.srcEvent.rotation);
	},
	
	/**
	 * Display the Wheel
	 */
	_show: function()
	{
		if ( this._isTouch == true )
		{
			this._domNode.style.opacity = 1;
			this._isDisplayed = true;
		}
	},
	
	/**
	 * Hide the Wheel
	 */
	_hide: function()
	{
		if ( this._isTouch == false )
		{
			this._domNode.style.display = 'none';
			this._isDisplayed = false;
		}
	},
	
	/**
	 * Position all the petals
	 * 
	 * @parameters:
	 * 	--> angle: the angle in degrees where to position the petal
	 */
	_positionPetals: function(angle)
	{
		for ( var i=0; i<12; i++ )
		{
			this._petals[i].setPosition(angle);
		}
	},
	
	/**
	 * Update the petal position property
	 * 
	 * @parameters:
	 * 	--> angle: the angle in degrees of the petal position
	 */
	_updatePetalsPosition: function(angle)
	{
		for ( var i=0; i<12; i++ )
		{
			this._petals[i].updatePosition(angle);
		}
	},
	
	/**
	 * Publish the '/wheel/events/select' event once the user totally finished his gesture
	 */
	_getSelectedPetal: function()
	{
		for ( var i=0; i<12; i++ )
		{
			if ( this._petals[i].selected === true )
			{
				wink.publish('/wheel/events/select', {'selectedItem': this._petals[i].id});
			}
		}
	},
	
	/**
	 * validate the properties
	 */
	_validateProperties: function()
	{
		if ( !wink.isUndefined(this._properties.fadeInDelay) && !wink.isInteger(this._properties.fadeInDelay) )
		{
			wink.log('[Wheel] The property fadeInDelay must be a positive integer');
			return false;
		}
		
		if ( !wink.isUndefined(this._properties.fadeInOutDuration) && !wink.isInteger(this._properties.fadeInOutDuration) )
		{
			wink.log('[Wheel] The property fadeInOutDuration must be a positive integer');
			return false;
		}
		
		if ( wink.isUndefined(this._properties.items) )
		{
			wink.log('[Wheel] The property items must be defined');
			return false;
		}
	},
	
	/**
	 * initialize the properties
	 */
	_initProperties: function()
	{
		if ( !wink.isUndefined(this._properties.fadeInDelay) )
		{
			this._fadeInDelay = this._properties.fadeInDelay;
		}
		
		if ( !wink.isUndefined(this._properties.fadeInOutDuration) )
		{
			this._fadeInOutDuration =  this._properties.fadeInOutDuration;
		}
		
		this._items = this._properties.items;
	},
	
	/**
	 * Init the touch and gesture listeners
	 */
	_initListeners: function()
	{
		var _this = this;

		wink.ux.touch.addListener($('wheel'), "start", { context: this, method: "_touchStart", arguments: null }, { tracking: false });
		wink.ux.touch.addListener($('wheel'), "move", { context: this, method: "_touchMove", arguments: null });
		wink.ux.touch.addListener($('wheel'), "end", { context: this, method: "_touchEnd", arguments: null });
		
		wink.ux.touch.addListener(this._domNode, "gesturestart", { context: this, method: "_gestureStart", arguments: null}, { preventDefault: true });
		wink.ux.touch.addListener(this._domNode, "gesturechange", { context: this, method: "_gestureChange", arguments: null}, { preventDefault: true });
		wink.ux.touch.addListener(this._domNode, "gestureend", { context: this, method: "_gestureEnd", arguments: null});
	},
	
	/**
	 * Init the Wheel DOM node
	 */
	_initDom: function()
	{
		this._domNode = document.createElement('div');	
		this._domNode.className = 'wh_container';
		
		this._domNode.style['-webkit-transition-property'] = 'opacity';
		this._domNode.style['-webkit-transition-duration'] = this._fadeInOutDuration + 'ms';
		
		for ( var i=0; i<this._items.length; i++ )
		{
			var petal = new wink.ui.xy.Wheel.Petal({'position': wink.math.radToDeg(2*i*(Math.PI/this._items.length)), 'image': this._items[i].img, 'id': this._items[i].id});
			
			this._domNode.appendChild(petal.getDomNode());
			this._petals.push(petal);
		}
	}
};

/**
 * Implement a Petal to be displayed in the Wheel
 * 
 * @methods:
 *	--> getDomNode: return the main DOM node of the petal
 *	--> setPosition: rotate the petal on the Wheel
 *	--> updatePosition: update the 'position' property
 *
 * @attributes:
 * 	--> uId: unique identifier of the component
 * 	--> position: the current position in degrees of the petal
 * 	--> image: the image representing the petal
 * 	--> id: the unique id of the petal (given at the instantiation of the Wheel)
 * 	--> selected: is the petal currently selected
 * 
 * @author:
 * 	--> Jerome GIRAUD
 */
wink.ui.xy.Wheel.Petal = function(properties)
{
	this.uId      = wink.getUId();
	
	this.position = properties.position;
	this.image    = properties.image;
	this.id       = properties.id;
	this.selected = false;
	
	this._domNode = null;
	
	this._initDom();
	this.setPosition(0);
};

wink.ui.xy.Wheel.Petal.prototype =
{
	TRANSFORM_ORIGIN_X: 38,
	TRANSFORM_ORIGIN_Y: 140,
	
	/**
	 * return the main DOM node of the Wheel
	 */
	getDomNode: function()
	{
		return this._domNode;
	},
	
	/**
	 * rotate the petal on the Wheel
	 * 
	 * @parameters:
	 * 	--> angle: the angle in degrees where to position the petal
	 */
	setPosition: function(angle)
	{
		this._domNode.rotate(angle+this.position);
		
		var absAngle = Math.abs(angle+this.position);
		var modulo = Math.floor(absAngle/360);
		
		var absAngle = absAngle - modulo*360;
		
		if ( (absAngle < wink.math.radToDeg((Math.PI/12))) || (absAngle >= wink.math.radToDeg((23*Math.PI/12))) )
		{
			this._domNode.className = 'wh_petal wh_selected';
			this.selected = true;
		} else
		{
			this._domNode.className = 'wh_petal';
			this.selected = false;
		}
	},
	
	/**
	 * update the 'position' property
	 * 
	 * @parameters:
	 * 	--> angle: the angle in degrees of the petal position
	 */
	updatePosition: function(angle)
	{
		this.position = angle + this.position;
	},
	
	/**
	 * Init the Petal DOM node
	 */
	_initDom: function()
	{
		this._domNode = document.createElement('div');
		this._domNode.className = 'wh_petal';
		
		this._domNode.style['-webkit-transform-origin'] = this.TRANSFORM_ORIGIN_X + 'px ' + this.TRANSFORM_ORIGIN_Y + 'px';
		
		if ( wink.isSet(this.image) )
		{
			this._domNode.style.backgroundImage = 'url(' + this.image + ')';
		}
	}
};