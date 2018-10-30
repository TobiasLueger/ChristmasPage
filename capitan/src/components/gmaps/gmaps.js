/**
 * Capitan gmaps.js v1.0.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 13.07.2018
 * MIT License (MIT)
 */

import assertBreakpoint from '../../js/function/assert-breakpoint';
import markerclusterer from './js/libs/vendor/markerclusterer/markerclusterer';

const _ = {
    defaults: {
        componentSelector: '.gmaps',
        $list: $('.gmaps__list'),
        $searchForm: $('.gmaps__search-form'),
        $searchBox: $('#gmaps__search-box'),

        // selectors
        result: '.gmaps__list .accordion__trigger',
        geoLocation: '.gmaps__geo-location',
        categoryItem: '.gmaps__category li',
        infoClose: '.gmaps__infowindow-close',

        // objects
        markers: [],
        locations: [],

        // options
        // apiKey: 'AIzaSyB_adaq7LcWoui8Jo6DVIDiTLVc_TNEfXE', // brandung acc
        apiKey: 'AIzaSyBz90YoxW35lT9oXoKBIO0CpuecJlZmaaA', // mediclin acc
        language: 'de',
        libraries: 'places',
        type: 'info',
        mapOptions: {
            disableDefaultUI: true,
            zoom: 14,
            maxZoom: 14,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        },
        markerAnimation: 'drop',
        useDirectionService: true,
        useSearchBoxService: true,
        centerOnClick: true,
        zoomOnClick: true,
        detailZoomLevel: 14,
        // locationsAjaxUrl: 'http://www.mocky.io/v2/5b48b9b43100005a008bbeb3', // interseroh test data
        locationsAjaxUrl: 'http://www.mocky.io/v2/5b6c6a192f00005520893d67',
        loadAllStores: true,
        useDummyStores: false,
        useMarkerCluster: true,
        useFancyInfoWindow: false,
        iconPath: Capitan.Vars.folderPath + 'img/gmaps/marker.svg',
        iconActivePath: Capitan.Vars.folderPath + 'img/gmaps/marker-active.svg',
        clusterIconStyles: [
            {
                url: Capitan.Vars.folderPath + 'img/gmaps/m1.png',
                height: 53,
                width: 53,
                textColor: '#fff',
                textSize: 12
            }
        ],
        theme: 'landscape',
        themeStyles: [
            { "featureType": "landscape.natural", "stylers": [ { "color": "#dfeaea" } ] },
            { "featureType": "landscape.natural.terrain", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] },
            { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#dfdfdf" } ] },
            { "featureType": "poi", "elementType": "labels", "stylers": [ { "visibility": "off" } ] },
            { "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] },
            { "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "color": "#ffffff" } ] },
            { "featureType": "road", "elementType": "labels", "stylers": [ { "visibility": "off" } ] },
            { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#c3d8e0" } ] },
            { "featureType": "water", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }
        ],

        // ids and classes
        searchBoxID: 'gmaps__search-box',
        openClass: 'is-open',
        categoryActive: 'gmaps__category-active'
    }
};

const o = _.defaults;

/**
 * add event listeners
 *
 */
function addListeners () {
    // event for selecting a location from the list
    Capitan.Vars.$body.off('click', o.result);
    Capitan.Vars.$body.on('click', o.result, function (e) {
        e.preventDefault();

        let $this = $(this);

        triggerMarker($this.data('marker'));
    });

    // close info window
    Capitan.Vars.$body.off('click', o.infoClose);
    Capitan.Vars.$body.on('click', o.infoClose, function (e) {
        e.preventDefault();

        console.log('infoClose');
    });

    // filter results with category property
    Capitan.Vars.$body.off('click', o.categoryItem);
    Capitan.Vars.$body.on('click', o.categoryItem, function (e) {
        e.preventDefault();

        let $this = $(this);

        // different ajax response depending on activated category
        if($this.hasClass(o.categoryActive)) {
            $this.removeClass(o.categoryActive);

            console.log('without category');

            doAjax();
        } else {
            $(o.categoryItem).removeClass(o.categoryActive);

            $this.addClass(o.categoryActive);

            console.log('category', $this.data('category'));

            doAjax();
        }
    });

    if (o.$searchForm.length > 0) {
        // trigger search event
        Capitan.Vars.$body.off('submit', o.$searchForm);
        Capitan.Vars.$body.on('submit', o.$searchForm, function (e) {
            console.log(e);
            e.preventDefault();

            console.log('$searchForm');

            // send ajax call to update list and map
            google.maps.event.trigger(self.search, 'place_changed');
        });
    }

    // event for getting own geo location
    Capitan.Vars.$body.off('click', o.geoLocation);
    Capitan.Vars.$body.on('click', o.geoLocation, function (e) {
        e.preventDefault();

        // function to display users position into map
        geoLocation();
    });
};

/**
 *
 * @param {String} markerID
 * @param {Boolean} showInfo
 */
function triggerMarker (markerID, showInfo) {
    console.log('triggerMarker', markerID, showInfo);

    for (let i = 0; i < self.savedMarkers.length; i++) {
        if (self.savedMarkers[i].id === parseInt(markerID)) {
            google.maps.event.trigger(self.savedMarkers[i], 'click');

            self.savedMarkers[i].setIcon({
                url: o.iconActivePath,
                size: new google.maps.Size(48, 60),
                scaledSize: new google.maps.Size(48, 60),
                anchor: new google.maps.Point(0, 60)
            });
        } else {
            self.savedMarkers[i].setIcon({
                url: o.iconPath,
                size: new google.maps.Size(48, 60),
                scaledSize: new google.maps.Size(48, 60),
                anchor: new google.maps.Point(0, 60)
            });
        }
    }
};

/**
 * geo location request
 *
 */
function geoLocation () {
    console.log('geoLocation');

    // check if geolocation is available at browser
    if(!!navigator.geolocation) {
        console.log('geolocation supported');

        // options for geo location callback
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            let crd = pos.coords;

            let position = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            };

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);

            // set view point of map at new position
            self.map.setCenter(position);
            self.map.setZoom(o.detailZoomLevel);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
        console.log('geolocation NOT supported');
    }
};

/**
 * load google maps theme json
 *
 * @param {Object} map
 */
function loadTheme (map) {
    console.log('loadTheme', map);

    map.setOptions({
        styles: o.themeStyles
    });
};

/**
 * set marker for every marker
 *
 */
function setMarkers () {
    console.log('setMarkers');

    let bounds = new google.maps.LatLngBounds(),
        iconMain = {
            url: o.iconPath,
            size: new google.maps.Size(48, 60),
            scaledSize: new google.maps.Size(48, 60),
            anchor: new google.maps.Point(0, 60)
        };

    // object for active marker
    self.activeMarker = null;

    // array to save markers
    self.savedMarkers = [];

    // loop through our array of markers & place each one on the map
    for (let i = 0; i < o.markers.length; i++) {
        let position = new google.maps.LatLng(parseFloat(o.markers[i].lat), parseFloat(o.markers[i].lng)),
            infoContent = '<div class="gmaps__infowindow">' +
                '<div class="row">' +
                    '<div class="col-xs-12 col-md-6">' +
                        '<img src="' + o.markers[i].image + '" alt="' + o.markers[i].name + '" />' +
                    '</div>' +
                    '<div class="col-xs-12 col-md-6">' +
                        '<p><span class="util-text-small">' + o.markers[i].type + '</span><br />' +
                        '<span class="util-text-big"><strong>' + o.markers[i].name + '</strong></span></p>' +
                        '<ul class="util-reset-padding-left">' +
                            '<li class="util-icon util-icon--before util-icon--location-o">' + o.markers[i].street + ' ' + o.markers[i].houseNumber + '</li>' +
                            '<li class="gmaps__item">' + o.markers[i].postCode + ' ' + o.markers[i].city + '</li>' +
                            '<li class="gmaps__item"><a href="' + o.markers[i].routeUrl + '" class="util-link util-icon--after util-icon--arrow-right" target="_blank">' + self.wording[0] + '</a></li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="col-xs-12">' +
                        '<hr />' +
                        '<p><strong>' + self.wording[1] + '</strong><br />' +
                        '<span class="util-text-small">' + o.markers[i].specialField + '</span></p>' +
                    '</div>' +
                    '<div class="col-xs-12">' +
                        '<a href="' + o.markers[i].clinicUrl + '" target="_blank" class="btn btn--primary">' + self.wording[2] + '</a>' +
                        '<a href="mailto:' + o.markers[i].email + '" class="btn btn--secondary util-add-margin-x">' + self.wording[3] + '</a>' +
                    '</div>' +
                '</div>' +
            '</div>',
            marker = new google.maps.Marker({
                position: position,
                map: self.map,
                icon: iconMain,
                infoContent: infoContent,
                id: i
            });

        // make markers drop onto map
        if (o.markerAnimation === 'drop') {
            marker.setAnimation(google.maps.Animation.DROP);
        } else if (o.markerAnimation === 'bounce') {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }

        // if there is more than one marker, automatically center the map fitting all markers on the screen
        if (o.markers.length > 1) {
            bounds.extend(position);
            self.map.fitBounds(bounds);
        } else {
            self.map.setCenter(position);
        }

        // set marker and map listener
        if (o.type === 'info') {

            // set info window for gmap
            let infoWindow = new google.maps.InfoWindow({
                content: ''
            });

            infoWindow.setZIndex(10000);

            // trigger info window close
            google.maps.event.addListener(infoWindow, 'closeclick', function() {
                deselectMarker(infoWindow);
            });

            // init info window box
            google.maps.event.addListener(infoWindow, 'domready', function() {
                // Reference to the DIV which receives the contents of the infowindow using jQuery
                let infoOuter = $('.gm-style-iw'),
                    infoClose = infoOuter.next();

                // add class to close button
                infoClose.addClass('gmaps__infowindow-close');
                infoClose.addClass('util-icon');
                infoClose.addClass('util-icon--after');
                infoClose.addClass('util-icon--close');
            });

            // marker click listener
            google.maps.event.addListener(marker, 'click', function () {
                if (self.activeMarker !== marker) {
                    selectMarker(infoWindow, marker);
                } else {
                    deselectMarker(infoWindow);
                }
            });

            google.maps.event.addListener(self.map, 'click', function () {
                deselectMarker(infoWindow);
            });
        }

        // set marker click events
        marker.addListener('click', (function (marker) {
            return function () {
                // zoom in on store if setting is enabled and current zoom level is lower than defined detail zoom level
                if (o.zoomOnClick && self.map.getZoom() < o.detailZoomLevel) {
                    self.map.setZoom(o.detailZoomLevel);

                    // trigger click for choosen accordion element
                    if (o.type === 'accordion') {
                        if (!o.$list.find('[data-marker="' + marker.id + '"]').hasClass(o.openClass)) {
                            o.$list.find('[data-marker="' + marker.id + '"]')[0].click();
                        }
                    }
                }

                // center map depending on type and breakpoint
                if (o.centerOnClick) {
                    self.map.setCenter(this.getPosition());

                    // move marker for accordion type
                    if (assertBreakpoint('ht', 'md') && o.type === 'accordion') {
                        self.map.panBy(222, 0);
                    }

                    // move marker for info type
                    if (o.type === 'info') {
                        self.map.panBy(0, -500);
                    }
                }
            }
        })(marker));

        // update saved marker
        self.savedMarkers.push(marker);
    }

    // fitBounds function runs
    let boundsListener = google.maps.event.addListener((self.map), 'bounds_changed', function () {
        google.maps.event.removeListener(boundsListener);
    });
};


/**
 * select marker and open info window
 *
 * @param {Object} infoWindow
 * @param {Object} marker
 */
function selectMarker (infoWindow, marker) {
    console.log('selectMarker', infoWindow, marker);

    infoWindow.open(self.map, marker);

    infoWindow.setContent(marker.infoContent);

    $(o.componentSelector).addClass('is-active');

    self.activeMarker = marker;
}


/**
 * deselect marker and close info window
 *
 * @param {Object} infoWindow
 */
function deselectMarker (infoWindow) {
    console.log('deselectMarker');

    infoWindow.close();

    $(o.componentSelector).removeClass('is-active');

    self.activeMarker = null;
}


/**
 * create google control
 *
 * @param {String} controlDiv
 * @param {String} element
 */

function createControl (controlDiv, element) {
    let wrapper = document.createElement('div'),
        block,
        blockIn,
        blockOut;

    switch(element) {
        case 'facility':
            wrapper.classList.add('gmaps__cta');
            wrapper.classList.add('util-visible-md');
            controlDiv.appendChild(wrapper);

            block = document.createElement('div');
            block.classList.add('form__field-wrapper');
            block.classList.add('util-reset-margin-bottom');
            block.innerHTML = '<a href="http://www.google.de" target="_blank" class="btn btn--tertiary">' + self.wording[4] + '</a>';
            wrapper.appendChild(block);
            break;
        case 'location':
            wrapper.classList.add('gmaps__location');
            wrapper.classList.add('util-visible-md');
            controlDiv.appendChild(wrapper);

            block = document.createElement('form');
            block.classList.add('form');
            block.innerHTML = '<button class="btn btn--primary gmaps__geo-location">' + self.wording[5] + '</button>';
            wrapper.appendChild(block);
            break;
        case 'search':
            wrapper.classList.add('gmaps__search');
            wrapper.classList.add('util-visible-md');
            controlDiv.appendChild(wrapper);

            block = document.createElement('form');
            block.classList.add('form');
            block.innerHTML = '<div class="form__field-wrapper"><input type="text" id="gmaps__search-box" placeholder="' + self.wording[6] + '" /></div>';
            wrapper.appendChild(block);
            break;
        case 'zoom':
            wrapper.classList.add('gmaps__control');
            controlDiv.appendChild(wrapper);

            blockIn = document.createElement('form');
            blockIn.classList.add('gmaps__button-in');
            blockIn.innerHTML = '<span class="util-icon util-icon--before util-icon--plus"></span>';
            wrapper.appendChild(blockIn);

            blockOut = document.createElement('form');
            blockOut.classList.add('gmaps__button-out');
            blockOut.innerHTML = '<span class="util-icon util-icon--before util-icon--minus"></span>';
            wrapper.appendChild(blockOut);

            // Setup the click event listener - zoomIn
            google.maps.event.addDomListener(blockIn, 'click', function() {
                self.map.setZoom(self.map.getZoom() + 1);
            });

            // Setup the click event listener - zoomOut
            google.maps.event.addDomListener(blockOut, 'click', function() {
                self.map.setZoom(self.map.getZoom() - 1);
            });
            break;
        default:
    }

}

/**
 * create google map
 *
 * @param {String} id
 */
function generateMap (id, facility, location, search, zoom) {
    console.log('generateMap');

    let map = {};

    map = new google.maps.Map(document.getElementById(id), o.mapOptions);

    if (facility) {
        let controlDiv = document.createElement('div'),
            control = new createControl(controlDiv, 'facility');

        // add custom control into map
        controlDiv.index = 1;
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    }

    if (search) {
        let controlDiv = document.createElement('div'),
            control = new createControl(controlDiv, 'search');

        // add custom control into map
        controlDiv.index = 2;
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);

        setTimeout(function () {
            if (o.useSearchBoxService) {
                console.log('useSearchBoxService');

                // Create the autocomplete object, restricting the search
                // to geographical location types.
                self.search = new google.maps.places.Autocomplete(document.getElementById(o.searchBoxID), {
                    types: ['geocode']
                });

                // set auto complete service
                self.autoCompleteService = new google.maps.places.AutocompleteService();

                // set language
                self.search.setComponentRestrictions(
                    {'country': ['de']}
                );

                // When the user selects an address from the dropdown,
                // populate the address fields in the form.
                self.search.addListener('place_changed', function () {
                    console.log('place_changed');
                    getPlaces();
                });

                map.addListener('bounds_changed', function () {
                    console.log('bounds_changed');
                    self.search.setBounds(map.getBounds());
                });
            }
        }, 1500);
    }

    if (location) {
        let controlDiv = document.createElement('div'),
            control = new createControl(controlDiv, 'location');

        // add custom control into map
        controlDiv.index = 3;
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
    }

    if (zoom) {
        let controlDiv = document.createElement('div'),
            control = new createControl(controlDiv, 'zoom');

        // add custom control into map
        controlDiv.index = 4;
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv);
    }

    google.maps.event.trigger(map, 'resize');

    // save map in object
    self.map = map;

    // generate markers from array
    setMarkers();

    // move map to display marker at accordion type
    if (assertBreakpoint('ht', 'md') && o.type === 'accordion') {
        self.map.panBy(222, 0);
    }

    // set marker cluster to group multiple markers
    if (o.useMarkerCluster) {
        self.markerCluster = new MarkerClusterer(map, self.savedMarkers, {
            styles: o.clusterIconStyles,
            maxZoom: 18
        });
    }

    if (o.theme) {
        loadTheme(map);
    }
};

/**
 * get all locations and save them for further use
 *
 * @param {Object} $obj
 */
function prepareLocations ($obj) {
    console.log('prepareLocations');

    let id = $obj.attr('id'),
        ajaxUrl = $obj.data('ajax-url'),
        type = $obj.data('type'),
        facility = $obj.data('facility'),
        location = $obj.data('location'),
        search = $obj.data('search'),
        zoom = $obj.data('zoom'),
        wording = $obj.data('wording');

    self.wording = wording;

    if (type !== '') {
        o.type = type;
    }

    if (ajaxUrl !== '') {
        o.locationsAjaxUrl = ajaxUrl;
    }

    // empty markers
    o.markers = [];

    if (o.locationsAjaxUrl !== null && o.loadAllStores) {
        doAjax(ajaxUrl);
    }

    // generate gmaps depending on properties
    generateMap(id, facility, location, search, zoom);
};

/**
 * prepare map
 *
 */
function prepareMap () {
    console.log('prepareMap');

    for (let n of $(o.componentSelector)) {
        prepareLocations($(n));
    }
};

/**
 * update markers in map
 *
 * @param {Object} markers
 */
function updateMarkers (markers) {
    console.log('updateMarkers', markers);

    // clear markers
    o.markers = [];

    resetMap();

    // save new markers
    o.markers = markers;

    // info data is not from google, different infos have to be displayed
    self.isGoogleData = false;

    // set markers
    setMarkers();

    if(o.useMarkerCluster) {
        self.markerCluster.addMarkers(self.savedMarkers);
    }
};

/**
 * removes all markers from map
 *
 */
function resetMap () {
    console.log('resetMap');

    o.markers = [];

    // clear marker cluster when activated
    if(o.useMarkerCluster) {
        self.markerCluster.clearMarkers();
    }

    // clear saved marker when enabled
    if(self.savedMarkers) {
        self.savedMarkers = [];

        for (let i = 0; i < self.savedMarkers.length; i++) {
            self.savedMarkers[i].setMap(null);
        }
    }
};

/**
 * do ajax to collect markers
 *
 */
function doAjax (ajaxUrl) {
    if(ajaxUrl) {
        ajaxUrl = ajaxUrl;
    } else {
        ajaxUrl = o.locationsAjaxUrl;
    }

    // building typo specific api url
    if (location.hostname === "kunden.agentur-brandung.de" || location.host === "localhost:3000") {
        o.prefixURL = 'https://career-stage.mcl.kundenheimat.de/';
        // o.prefixURL = 'http://web.poezmen-mdc-cp.brandung-dev.de/';
    } else {
        o.prefixURL = '';
    }

    ajaxUrl = o.prefixURL + ajaxUrl;

    console.log('doAjax', ajaxUrl);

    $.ajax({
        type: 'GET',
        url: ajaxUrl,
        dataType: 'json',
        success: function (data) {
            // reset map to display only new markers
            resetMap();

            for (let i of data) {
                o.markers.push({
                    id: i.id,
                    lat: i.lat,
                    lng: i.lng,
                    image: i.image ? i.image : '',
                    type: i.type,
                    name: i.name,
                    street: i.street ? i.street : '',
                    houseNumber: i.houseNumber ? i.houseNumber : '',
                    postCode: i.postCode ? i.postCode : '',
                    city: i.city ? i.city : '',
                    routeUrl: i.routeUrl ? i.routeUrl : '',
                    specialField: i.specialField ? i.specialField : '',
                    clinicUrl: i.clinicUrl ? i.clinicUrl : '',
                    email: i.email ? i.email : ''
                });
            }

            // creates markers which included into array before
            setMarkers();

            // set marker cluster to group multiple markers
            if (o.useMarkerCluster) {
                self.markerCluster = new MarkerClusterer(self.map, self.savedMarkers, {
                    styles: o.clusterIconStyles,
                    maxZoom: 18
                });
            }
        },
        error: function (xhr) {
            console.log('error...', xhr);
        }
    });
};

/**
 * create autocomplete list
 *
 */
function getPlaces () {
    console.log('getPlaces');

    // get the place details from the search object.
    let place = self.search.getPlace();

    if (place.geometry !== undefined) {
        let lat = place.geometry.location.lat(),
            lng = place.geometry.location.lng(),
            ajaxUrl = 'index.php?lat=' + lat + '&lng=' + lng + '&city=' + place.name;

        console.log('ajaxUrl', ajaxUrl);

        // set search input value
        o.$searchBox.val(place.formatted_address);

        o.markers = [];

        doAjax();

    } else {
        doAjax();

        // delete search input value
        o.$searchBox.val('');
    }
};

export function init(noGoogleData) {
	console.log('init gmaps');

    if (document.querySelector(o.componentSelector)) {

        !noGoogleData ? self.isGoogleData = false : true;

        // if map has not been initialized, append script and run gmaps
        if (!Capitan.Vars.$body.hasClass('js-gmaps-init')) {
            Capitan.Vars.$body.append('<script async defer src="https://maps.googleapis.com/maps/api/js?v=3&libraries=' + o.libraries + '&language=' + o.language + '&key=' + o.apiKey + '"></script>');
            Capitan.Vars.$body.addClass('js-gmaps-init');
        }

        // set little timeout cause bigger preparing time
        setTimeout(function () {
            addListeners();

            prepareMap();
        }, 500);
    }
}
