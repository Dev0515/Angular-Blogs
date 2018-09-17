import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data;
  allBlogs;
  allPosts;
  postForm: FormGroup;
  count = false;
  show = false;
  message;
  img: any;
  constructor(private router: Router, private _http: Http,
    private fb: FormBuilder,

  ) {
    this.postForm = this.fb.group({
      'blogTitle': ['', [Validators.required]],
      'blogDescription': ['', [Validators.required]],
      'blogBody': ['', Validators.required],
      'image': ['', [Validators.required]],

    });
  }

  imagesave(e: Event) {
    //debugger;
    const target: HTMLInputElement = e.target as HTMLInputElement;
    let file = target.files[0];
    this.img = file;
    console.log(this.img);
  }
  //to add new blog
  addNewBlog() {
    this.router.navigate(['addblog']);
  }
  //to add new post in a blog
  addNewPost() {
    this.count = true;
    this.show = false;
    //this.router.navigate(['addpost']);
  }
  //getting all blogs' data
  viewAllBlogs() {
    this.count = false;
    this.show = true;
    this._http.get("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/object-type/blogs", {

      params: {

        read_key: 'TguIxeWUofjfL6bWOS6uzd1zJllY1AQwFqOrfd83Fq2LWe65cx',
      }
    })
      .subscribe(res => {
        debugger;
        this.data = res;
        var jsondata = JSON.parse(this.data._body);
        this.allBlogs = jsondata.objects;
      })
  }
  //view all Posts from logged in user
  viewBlogs() {
    this.count = false;
    this.show = true;
    var jsondata = JSON.parse(localStorage.getItem('user'));
    const userName = jsondata.jsondata.objects[0].metadata.username;
    this._http.get("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/object-type/blogs/search", {

      params: {

        metafield_key: 'author',
        metafield_value: userName,
        //limit: 10,
        read_key: 'TguIxeWUofjfL6bWOS6uzd1zJllY1AQwFqOrfd83Fq2LWe65cx',
      }
    })
      .subscribe(res => {
        this.data = res;
        var jsondata = JSON.parse(this.data._body);
        this.allBlogs = jsondata.objects;
        // var result = this.allBlogs.content.split(" ")[0]
        console.log(this.allBlogs);

      })
  }
  //logging user out
  logout() {
    localStorage.removeItem('user');

    this.router.navigate(['']);
  }

  submitForm() {

    //const userData = localStorage.getItem('user');
    var jsondata = JSON.parse(localStorage.getItem('user'));
    const userName = jsondata.jsondata.objects[0].metadata.username;
    // console.log(userName.blogTitle);
    const credentials = this.postForm.value;
    //console.log(credentials.blogTitle);
    credentials.write_key = 'hApI9OnPr4ebLZwZTkIPjsId8lgGC4V5LWjkxw5Fwo3q4JKtwT';
    //console.log(credentials);
    this._http.post("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/add-object/", {
      title: credentials.blogTitle, content: credentials.blogBody, slug: credentials.title, type_slug: 'blogs', write_key: credentials.write_key,
      metafields: [
        {
          key: "author",
          type: "text",
          value: userName
        },
        {
          key: "description",
          type: "text",
          value: credentials.blogDescription
        },
        {
          key: "blogImage",
          type: "file",
          value: this.img
        },
      ]
    })
      .subscribe(res => {
        console.log(res);
        this.message = "Blog added successfully";
      })

  }


  ngOnInit() {

  }

}
