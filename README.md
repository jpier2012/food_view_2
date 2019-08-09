# README

# FoodView2

Welcome to FoodView2! This include all the awesomeness of the original FoodView, but with asynchronous JS functions incuded!

With this app you can take pictures of your food to post online for all the world to see! You'll be able to rate each dish you create and also see Dishes created by other people. You can also add your own restaurants, or use those created by others.

This is my fourth project as a Flatiron school student.

# Installation

Clone the github repository by entering the following commands into your IDE terminal:
```git clone git@github.com:jpier2012/food_view_2.git```

Change to the cloned food_view_2 directory:
```cd food_view_2```

Install all required gems:
```bundle```

Migrate the database:
```rake db:migrate```

Seed the database (optional):
```rake db:seed```

To use Github OAuth:

Login to your github account, navigate to setting > Developer settings > OAuth Apps > New OAuth app — Github application page.

Enter homePage URL:

```http://localhost:3000```

Enter callback URL:

```http://localhost:3000/users/auth/github/callback```

After that, click on Register application. Hence, you will redirect to the application page which has your client ID and Client secret. 

Create a .env file in the home directory of the app (food_view_2)

Add the following text to it, copying the github key and secret from the app, then save.
```
GITHUB_KEY=<<<your_key>>>
GITHUB_SECRET=<<<your_secret>>>
```

Initiate rails server:
```rails s```

Then visit localhost:3000 to get started!

# Instructions

After signing up, add dishes to existing restaurants or create a new restaurant listing. From there you can check out dishes that you've created and the restaurants associated to them, or check out the indexes of all dishes and restaurants created by all users.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/jpier2012/food_view_2. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Code of Conduct

Everyone interacting in the MisterFitness project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/'jpier2012'/food_view_2/blob/master/CODE_OF_CONDUCT.md).