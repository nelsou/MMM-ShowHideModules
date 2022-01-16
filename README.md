# Magic Mirror 2 - Show Hide modules

Thx to touch screen support this module will add links so you can show / hide them 

![alt text](https://github.com/nelsou/MMM-ShowHideModules/blob/master/screenshots/links.png "Image of MMM-ShowHideModules links")
![alt text](https://github.com/nelsou/MMM-ShowHideModules/blob/master/screenshots/integration.png "Image of MMM-ShowHideModules integration")

## Module installation

Git clone this repo into ~/MagicMirror/modules directory :
```
cd ~/MagicMirror/modules
git clone https://github.com/nelsou/MMM-ShowHideModules.git
```
and add the configuration section in your Magic Mirror config file : 

## Module configuration

````javascript
modules: [
{
    position: "top_left",
    module: 'MMM-ShowHideModules',
    config: {
        debug: true,
        modules: [
            {
                module: 'MMM-Jeedom',
                header: 'Lumières RDC',
            },
            {
                module: 'MMM-Jeedom',
                header: 'Lumières Etage',
            },
            {
                module: 'MMM-Jeedom',
                header: 'Radiateurs',
            }
        ]
    }
},
]
````
