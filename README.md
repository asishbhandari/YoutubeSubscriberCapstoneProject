# Youtube Subscribers API Capstone Project #

This API allows you to get information regarding youtube subscribers

The API is available at `https://` need to add deployement path

## Endpoints ##

### Get All Subscribers ###

GET `/subscribers`

Returns all the subscribers in the database with all information.

### Get Only name and subscribed channel of all subscribers ###

GET `/subscribers/names`

Returns a list of subscribers with only name and subscribed channel feilds

### Get a single subscriber details ###

GET `/subscribers/:id`

Provide the id parameter.

Retrieve detailed information about a subscriber.
