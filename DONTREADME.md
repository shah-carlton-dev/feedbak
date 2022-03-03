(ǝɹǝɥ ǝq ʇou plnoɥs noʎ)

# Feedbak project
Crowdsourcing business consulting

## How to start project
- cd into `feedbak` folder
- start frontend on 8080: `npm run start`
- start backend on 9090: `npm run server`

## Project structure
```
feedbak (root)
- server
    - db
    - routes
    - server.js
- src
    - components
    - css
    - App.js
    - index.html
    - index.js

```
## Server info
### Reviews/Posts
```
{
    _id: id,
    title: post title,
    author: author's id
    post: post body,
    score: score (int64),
    business: business id,
    featured: is featured boolean,
    date: new Date()
}
```
- `GET /posts/all/:id` returns all posts for the company ID given
- `GET posts/:id` returns the post with the ID given
- `POST posts/new` creates a new post with the JSON body content
- `PUT posts/update/:id` updates a post's score
- `DELETE posts/:id` deletes a post by ID
### Users
```
{
    _id: id,
    name: username,
    email: email,
    password: hashed for security ;),
    reviews: [review ids]
}
```
#### Endpoints

### Businesses
```
{
    _id: id,
    name: business name,
    about: quick business description,
    dateJoined: the date they join,
    website: a URL for the business,
    admins: [user ids that are admins for the business],
    featured: [review ids that are featured],
    reviews: [review ids for all reviews]
}
```
#### Endpoints