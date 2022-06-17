# @herii/react-gallery

![preview](https://i.imgur.com/LFJeaaR.png)

## A Component to add a Gallery to your React Projet

This is a very simple but powerful react component that allows you to add a gallery with different cool features.

## 💫 DEMO 🚀 💫

You can see a demo here on [codesandbox.io](https://codesandbox.io/s/little-sound-7h4db2?file=/src/App.js)



## 🚀 Features

- Add blur to a specific image of the gallery
- Add a parallax effect
- Add Content to the gallery (On top of an image of your gallery)
- You get two arrows to control the selected image.
- The images are preloaded for a fast and smooth transition between each image in the gallery

## 💽 Installation 

You can use npm or yarn to add our package to your project.

    yarn add @herii/react-gallery
    
    npm install @herii/react-gallery

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

## 💻 How to use

Import Gallery from our

    import {Gallery} from '@herii/react-gallery'

Now you are ready to use our component inside your app:

    <Gallery items={[{
                    img: "https://cdn.pixabay.com/photo/2022/05/31/17/14/bird-7233900_1280.jpg",
                    blur: true,
                    children: <div className='flex-center'>
                        <div>
                        <h1>Birds are cool</h1>
                        <p style={{color: 'white'}}>So as this gallery component is</p>
                        </div>
                    </div>
                }, 
                {
                    img: "https://cdn.pixabay.com/photo/2016/11/23/18/27/hummingbird-1854225_1280.jpg",
                    parallax: true,
                }]
            }/>

## Properties

The Component's properties are listed below.

### width

The width of the container of the images (The images use 100% of the width of the container)

|type | default|
|---|---|
|string|'100vw'|

### height

The height of the container of the images (The images use 100% of the height of the container)

|type | default|
|---|---|
|string|'100vh'|

### Items

The only parameter you can pass right now is the `items` which is an array  of objects

    [
        {
            // Object #1
        },
        {
            // Object #2...
        }
    ]

Each Object can have the following properties:

|  Property | Type(s)  | Example  | Default | Description |
|---|---|---|---|---|
| img  |  string | https://cdn.pixabay.com/photo/2022/05/31/17/14/bird-7233900_1280.jpg  | null  | The IMG URL or any object that can be passed to URL() in a background image: background-image: url(img) |
| blur  | boolean  |  true | false  | Add a blur on top of the image |
|  parallax | boolean  | true  | false  | Add a parallax effect to the image when scrolling the container |
| children  | JSX  | <>This is a React Fragment</>  | null  | JSX that will be added on top of the image, by default you don't have styles here but you can add your own styles to the JSX elements to center the elements|

### Example of an object with all properties

    {
        img: "https://cdn.pixabay.com/photo/2022/05/31/17/14/bird-7233900_1280.jpg",
        blur: true,
        parallax: true,
        children: <>Hello</>
    }


# Support
I created this project it to use it in my own projects as a reusable component and I support it and update it as much as I require to.

If you find any issue/glitch/bug you can create an issue by clicking [here](https://github.com/Heriberto-Juarez/React-Gallery/issues/new) and I'll review it and fix it as soon as possible.



If you want to support further development of this package / new features / etc, You can do it by [donating](https://www.paypal.com/donate/?hosted_button_id=N9ZNDBHCSLHWC) me whathever amount you desire. 