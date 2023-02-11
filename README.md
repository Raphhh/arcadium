# Arcadium

An HTML canvas manager written in TypeScript.


## Build JS (dev)

```shell
$ npm run dev
```

## How it works

See demo in [./demo](./demo) folder.


### Instantiate Arcadium

```html
<canvas id="my-canvas" width="480" height="320"></canvas>
```

```js
const arcadium = new Arcadium(document.getElementById('my-canvas'));


... your code here ...


//display
arcadium.display();
```

Or shorter

```js
arca(document.getElementById('main')).setup((arcadium) => {
    
    ... your code here ...
    
});
```

### Add an image

```html
<div style="display:none;">
    <img id="my-image" src="https://avatars.githubusercontent.com/u/5206490">
</div>
```

```js
const myImage = arcadium.stage.addImage(document.getElementById('my-image'), {
    x: 'center',
    y: 'center',
    width: 100,
    height: 100,
});
```

### Add a text

```js
const myText = arcadium.stage.addText('arcadium is the best');
```

### Add a shape

```js
const triangle = arcadium.stage.addShape(
    {},
    arcadium.services.spriteTriangleShapeRendering
);
triangle.fillStyle = 'red';
```

### Mouse interaction

```js
myImage.onMouseOver(function() {
    this.scale = {x: 1.1, y: 1.1};
});
myImage.onMouseOut(function() {
    this.scale = {x: 1, y: 1};
});
myImageonClick(function() {
    this.rotation.degrees += 45;
});
```


### Motion

Warning: motion is not optimized! 

Instead of `Arcadium.setup` (or after it), use `Arcadium.loop`

```js
arcadium.loop((arcadium) => {
    myImage.x += 1;
})
```

