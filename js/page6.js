/**
 * @author:
 * 	--> Jérôme GIRAUD
 */
pr.page6 = (function()
{
	var page6 = 
	{
		beginX: 0,
		currentX: 0,
			
		alpha: 0,
		alpha2: 0,
			
		delta: 0,
		delta2: 0,
			
		startEvent: null,
		endEvent: null,

		touched: false,
		
		script: null
	};
	
	/**
	 * 
	 */
	page6.init = function()
	{
		navigator.geolocation.getCurrentPosition(this.getStructureFromPosition, null, {highAccuracy: true});
		
		this.getStructureFromPanoId('VxzhBNNu-VGQC8HtVIaY3A');
		
		wink.fx.initComposedTransform(wink.byId('needle'));
		wink.fx.setTransformPart(wink.byId('needle'), 1, { type: "rotate", x: 0, y: 0, z: 1, angle: -45});
		wink.fx.applyComposedTransform(wink.byId('needle'));
		
		wink.ux.touch.addListener(wink.byId('viewer'), "start", { context: this, method: "touchStart", arguments: null }, { preventDefault: true });
		wink.ux.touch.addListener(wink.byId('viewer'), "move", { context: this, method: "touchMove", arguments: null }, { preventDefault: true });
		wink.ux.touch.addListener(wink.byId('viewer'), "end", { context: this, method: "touchEnd", arguments: null }, { preventDefault: true });
	};
	
	/**
	 * 
	 */
	page6.buildPanorama = function(structure)
	{
		var plan1 = document.createElement('div');
		
		plan1.id = 'plan1';
		plan1.className = 'plan';
		
		var x = 0;
		var y = 0;
		
		for ( var i=0; i<65; i++)
		{
			var img = document.createElement("img");
			
			img.style.position = "absolute";
			
			img.style.width = "110px";
			img.style.height = "84px";
			
			img.style.left = (x * 110) + "px";
			img.style.top = (y * 84) + "px";
			
			img.src= "http://cbk0.google.com/cbk?output=tile&panoid=" + this.panoId + "&zoom=4&x=" + x + "&y=" + y;
			
			x++;
			
			if ( x == 13 )
			{
				x = 0;
				y ++;
			}
			
			plan1.appendChild(img);
		}
		
		var plan2 = plan1.cloneNode(true);
		plan2.id = 'plan2';
		
		wink.fx.translate(plan2, -1430, 0);
		
		var plan3 = plan1.cloneNode(true);
		plan3.id = 'plan3';
		
		wink.fx.translate(plan3, 1430, 0);
		
		wink.byId('plans').innerHTML = "";
		
		if ( structure.Links )
		{
			var yaw1 = structure.Projection.pano_yaw_deg;
			
			for ( var i=0; i<structure.Links.length; i++ )
			{
				var yaw2 = structure.Links[i].yawDeg;
				
				var arrow1 = document.createElement('img');
				arrow1.className = 'arrow';
				arrow1.value = structure.Links[i].panoId;
				arrow1.src= 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
				
				wink.fx.translate(arrow1, 715 + (1430/360)*(yaw2-yaw1), 0);
				
				arrow1.onclick = function()
				{
					getStructureFromPanoId(this.value);
				};
				
				var arrow2 = arrow1.cloneNode(true);
				arrow2.value = structure.Links[i].panoId;
				wink.fx.translate(arrow2, 715 + (1430/360)*(yaw2-yaw1)-1430, 0);
				
				arrow2.onclick = function()
				{
					pr.page6.getStructureFromPanoId(this.value);
				};
				
				wink.byId('plans').appendChild(arrow1);
				wink.byId('plans').appendChild(arrow2);
			}
		}
		
		wink.byId('plans').appendChild(plan1);
		wink.byId('plans').appendChild(plan2);
		wink.byId('plans').appendChild(plan3);
	};
	
	/**
	 * 
	 */
	page6.getStructureFromPosition = function(position)
	{
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		
		if ( confirm('do you want to update your position ?'))
		{
			this.addScriptTag('http://cbk0.google.com/cbk?output=json&callback=pr.page6.getPanoId&ll=' + latitude + ',' + longitude);
		}
	};
	
	/**
	 * 
	 */
	page6.getStructureFromPanoId = function(panoId)
	{
		pr.page6.addScriptTag('http://cbk0.google.com/cbk?output=json&callback=pr.page6.getPanoId&panoid=' + panoId);
	};
	
	/**
	 * 
	 */
	page6.getPanoId = function(structure)
	{
		if ( !wink.isUndefined(structure) )
		{
			if ( structure.Location.panoId != this.panoId )
			{
				this.panoId = structure.Location.panoId;
				this.buildPanorama(structure);
			}
		} else
		{
			alert('no street view available for your current location, redirecting to default view');
			this.getStructureFromPanoId('VxzhBNNu-VGQC8HtVIaY3A');
		}
	};
	
	/**
	 * 
	 */
	page6.addScriptTag = function(url)
	{
		if ( wink.isSet(this.script))
		{
			document.getElementsByTagName("head")[0].removeChild(this.script);
		}
		
		this.script = document.createElement('script');
		this.script.type = 'text/javascript';
		
		this.script.src = url;

		document.getElementsByTagName("head")[0].appendChild(this.script);
	};
	
	/**
	 * 
	 */
	page6.touchStart = function(e)
	{
		this.startEvent = e;
		
		if ( this.delta2 != 0 )
		{
			this.currentX = (1430/360) * this.delta2;
		}
		
		this.alpha = 0;
		this.alpha2 = 0;
		
		this.touched = true;
		
		this.beginX = e.x;
	};
	
	/**
	 * 
	 */
	page6.touchMove = function(e)
	{

		if ( this.currentX + e.x - this.beginX > 715 )
		{
			this.currentX -= 1430;
		}else if ( this.currentX + e.x - this.beginX < -715 )
		{
			this.currentX += 1430;
		}
		
		this.translateContainer((360/1430)*(this.currentX + e.x - this.beginX));
	};
	
	/**
	 * 
	 */
	page6.touchEnd = function(e)
	{
		this.endEvent = e;
		
		this.currentX = this.currentX + e.x - this.beginX;
		this.delta = (360/1430)*this.currentX;
		
		if ( ((this.endEvent.timestamp-this.startEvent.timestamp) < 250) && (Math.abs(this.endEvent.x-this.startEvent.x) < 20))
		{
			this.endEvent.dispatch(this.endEvent.target, 'click');
		}
		
		this.touched = false;
	};
	
	/**
	 * 
	 */
	page6.listenToOrientationChange = function()
	{
		window.addEventListener('deviceorientation', pr.page6.orientationChange, false);
	};
	
	/**
	 * 
	 */
	page6.unListenToOrientationChange = function()
	{
		window.removeEventListener('deviceorientation', pr.page6.orientationChange, false);
	};
	
	/**
	 * 
	 */
	page6.orientationChange = function(e)
	{
		pr.page6.alpha = e.alpha;
		
		if ( pr.page6.alpha2 == 0 )
		{
			pr.page6.alpha2 = pr.page6.alpha;
			return;
		}
		
		if ( !pr.page6.touched )
		{
			if ( pr.page6.delta + (pr.page6.alpha-pr.page6.alpha2) > 180 )
			{
				pr.page6.delta2 = pr.page6.delta + (pr.page6.alpha-pr.page6.alpha2) - 360;
				pr.page6.translateContainer(pr.page6.delta + (pr.page6.alpha-pr.page6.alpha2) - 360);
			} else if ( pr.page6.delta + (pr.page6.alpha-pr.page6.alpha2) < -180)
			{
				pr.page6.delta2 = pr.page6.delta + (pr.page6.alpha-pr.page6.alpha2) + 360;
				pr.page6.translateContainer(pr.page6.delta + (pr.page6.alpha-pr.page6.alpha2) + 360);
			} else
			{
				pr.page6.delta2 = pr.page6.delta + (pr.page6.alpha-pr.page6.alpha2);
				pr.page6.translateContainer(pr.page6.delta + (pr.page6.alpha-pr.page6.alpha2));
			}
		}
	};
	
	/**
	 * 
	 */
	page6.translateContainer = function(angle)
	{
		var distance = (1430/360) * angle;
		
		wink.fx.translate(wink.byId('plans'), distance, 0);
		
		wink.fx.initComposedTransform(wink.byId('needle'));
		wink.fx.setTransformPart(wink.byId('needle'), 1, { type: "rotate", x: 0, y: 0, z: 1, angle: -45-angle});
		wink.fx.applyComposedTransform(wink.byId('needle'));
	};
	
	return page6;
})();