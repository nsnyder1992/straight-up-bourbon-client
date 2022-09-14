# Straight Up Bourbon

This website is for the Straight Up Bourbon YouTube channel to sell merchandise and interact with customers. The contents of this repo only contain the client-side. This project was created using React.

You will find that most of the components contained in the project are functional components, but there are some Class components (found in `./src/components/class-components`) and typescript components (found in `./src/components/typescript-components`) these were added to meet the curriculum of Eleven Fifty Academy to count for the final project.

Note: The YouTube Subscribe Button is also a Class Component

Styling was done mostly using Material-ui but some css was used in order to complete look desired

Website: [Straight Up Bourbon](https://straight-up-bourbon.herokuapp.com/)

## Pages and Major Components Functionality

1. #### NavBar

   - Regular User:
     - HOME
     - ABOUT
     - SHOP
     - PROFILE (profile icon)
     - SHOPPING CART (shopping cart icon)
   - Admin User (additional options):
     - ORDERS
     - USERS
     - ADMIN MODE BUTTON (Toggles admin mode off and on)

2. #### Home Page

   - Displays the latest Video the channel puts out
   - Allows user to explore older videos

3. #### About

   - Tells users what the channel is all about
   - Needs more content from actual channel (To come from Luke and Jp)

4. #### Shop

   - Regular User:
     - Allows user to view all merchandise items
     - If user clicks on an item it will reroute them to that products page
   - Admin user:
     - If in admin mode admin can add or delete an item
     - Error messages have been added to help guide the admin not to make a mistake
     - In admin mode the navigation to products page is turned off

5. #### ProductPage

   - Regular User:
     - Allows user to view specified product
     - Allows user to add item to cart
   - Admin user:
     - If in admin mode admin can update the item
     - Error messages have been added to help guide the admin not to make a mistake
     - This is the place the admin can add to their stock

6. #### Profile

   - Allows users to view their information
   - Allows users to logout
   - Allows users to view their orders
   - Allows users to cancel their orders
   - If user clicks on the orders row it will redirect them to the Order page

7. #### Order

   - Regular User:
     - Allows user to view order details and get a more accurate status straight from shipEngine
   - Admin User:
     - if in admin mode the admin can download the label

8. #### Shopping Cart

   - Regular User:
     - Allows user to update their items and checkout
     - If checkout is requested the customer is off loaded to the stripe checkout session
     - If the session is completed successfully the customer is redirected to the Success page
     - If failure or the user cancels the session occurs then the customer is redirected to the Canceled page
     - A webhook on the backend does a lot

9. #### Success

   - Clears Shopping Cart

10. #### Canceled

    - Leaves Shopping Cart unaffected

### Admin **ONLY** Views

11. #### Orders

    - Allows admins to view and edit all orders
    - If admin clicks on a row they are redirected to that orders page

12. #### Users

    - Allows admins to view all users
    - Allows admins to edit users admin rights
