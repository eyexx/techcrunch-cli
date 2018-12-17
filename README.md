<div align="center">
  <br>
  <img
  src="assets/Logo.png" 
  width=500px
  height = 195px
  />
  
  <h1>TechCrunch-CLI</h1>
  	<p>
  		<b>TechCrunch Reader for Hackers - A CLI for reading TechCrunch.</b>
  	</p>
      <a href="https://opensource.org/licenses/MIT/">
        <img src="https://img.shields.io/github/license/Naereen/StrapDown.js.svg" alt="MIT"/>
      </a>
  	<br>
  	<br>
  	<br>
  
</div>



Installation
------------

`$ npm install -g techcrunchcli`

Docs
----
    Usage: tc [options] [command]

    Commands:

    top                            List TechCrunch top articles
    tag  <tag>                     List current articles by tag
    search <searchTerms...>        Search articles by words
   
    Options:

    -h, --help     output usage information
    -V, --version  output the version number
  
   
Usage
-----
The commands available are: `tc top`, `tc tag`, `tc search`

#### top command
`$ tc top <tag>`

 List TechCrunch top articles

#### tag command
`$ tc tag <searchTerms...>  `

List current articles by tag


#### search command
`$ tc search`

Search articles by words


Contributing
------------

All feedback and suggestions are welcome, just post an issue!

Author
-------

[Kosuke Yoshimura](https://koshukey.github.io/)


License
-------
Licensed under the [MIT license](http://opensource.org/licenses/MIT).