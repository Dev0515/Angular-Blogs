import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-allblogs',
  templateUrl: './allblogs.component.html',
  styleUrls: ['./allblogs.component.css']
})
export class AllblogsComponent implements OnInit {
  data;
  allBlogs;
  allPosts;
  constructor(private _http: Http, private route: Router) { }
  //fetching all blogs from server
  showAllBlogs()
  {
    this._http.get("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/object-type/posts",{

      params: {        
        read_key: 'TguIxeWUofjfL6bWOS6uzd1zJllY1AQwFqOrfd83Fq2LWe65cx',
    } 

    })
    .subscribe(res => {
      this.data = res;
      var jsondata = JSON.parse(this.data._body);
      this.allPosts = jsondata.objects;
      console.log(this.allPosts);
          
    })
  }
  //getting posts from seleted blog
  showPosts(value)
  {
    console.log(value);
    this._http.get("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/object-type/posts/search",{

      params: {
      
        metafield_key: 'blog_id',
        metafield_value: value,
        //limit: 10,
        read_key: 'TguIxeWUofjfL6bWOS6uzd1zJllY1AQwFqOrfd83Fq2LWe65cx',
    }  
  })
  .subscribe(res => {
    console.log(res);
    this.data = res;
    var jsondata = JSON.parse(this.data._body);
    this.allPosts = jsondata.objects;
    
  })
  }

  loginCall()
  {
    this.route.navigate(['login']);
  }
  
  ngOnInit() {
    this.showAllBlogs()
  }

}
