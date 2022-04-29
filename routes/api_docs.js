/**
 * @openapi
 * components:
 *  schemas:
 *   Bidder:
 *    type: object
 *    required:
 *     - username
 *     - email
 *     - password
 *    properties:
 *          _id:
 *              type: string
 *              example: 6kdsjflksdfkljd9
 *          username:
 *              type: string
 *              default: username
 *          email:
 *              type: string
 *              example: username@gmail.com
 *          password:
 *              type: string
 *              example: password
 *          auctions:
 *              type: array
 *              default: []
 *          bids:
 *              type: array
 *              default: []
 *          timestamps:
 *              type: string
 *              example: 2022-04-28T19:53:40.955Z
 *  */

/**
 * @openapi
 * components:
 *  schemas:
 *   Auction:
 *    type: object
 *    required:
 *     - title
 *     - base_price
 *     - description
 *     - category
 *     - start_time
 *     - end_time
 *     - image
 *    properties:
 *          _id:
 *              type: string
 *              example: 6kdsjflksdfkljd9
 *          title:
 *              type: string
 *              example: Peugeot 504
 *          base_price:
 *              type: number
 *              example: 5400
 *          description:
 *              type: string
 *              example: classic 2000s motor car
 *          category:
 *              type: array
 *              example: ['Automobile']
 *          seller:
 *              type: object
 *              example: {'email': 'user@gmail.com'}
 *          start_time:
 *              type: string
 *              example: 2022-04-28T19:53:40.955Z
 *          end_time:
 *              type: string
 *              example: 2022-04-28T19:53:40.955Z
 *          image:
 *              type: string
 *              example: Peugeot504.jpg
 *          bidders:
 *              type: array
 *              example: {"email": "user@gmail.com", "price": 1200}
 *          timestamps:
 *              type: string
 *              example: 2022-04-28T19:53:40.955Z
 *  */

/**
 * @openapi
 * components:
 *  schemas:
 *   Category:
 *    type: object
 *    required:
 *     - title
 *    properties:
 *          _id:
 *              type: string
 *              example: 6kdsjflksdfkljd9
 *          title:
 *              type: string
 *              example: Technology
 *          auctions:
 *              type: array
 *              example: ["625a05666a1ff4726fae3c89"]
 *          timestamps:
 *              type: string
 *              example: 2022-04-28T19:53:40.955Z
 *  */

/**
 * @openapi
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: token
 *          description: API key for Authorization
 */

/**
 * @openapi
 * /bidder/signup:
 *  post:
 *      tags:
 *      - Bidder
 *      summary: Signup as a User(Bidder)
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Signup successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          $ref: '#/components/schemas/Bidder'
 *          500:
 *              description: unable to signup
 */

/**
 * @openapi
 * /bidder/signin:
 *  post:
 *      tags:
 *      - Bidder
 *      summary: Sign In as a User(Bidder)
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Signed In successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object 
 *                          properties:
 *                              token:
 *                                  type: string 
 *          400:
 *              description: Email/Password field cannot be empty
 *          401:
 *              description: Unauthenticated - Email or Password Incorrect
 */

/**
 * @openapi
 * /bidder/myauctions:
 *  get:
 *      tags:
 *      - Bidder
 *      summary: List all auctions of a signed in bidder
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: an array of all user auctions`
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array 
 *                          items: 
 *                              $ref: '#/components/schemas/Auction'
 *          500:
 *              description: unable to retrieve all your auctions    
 */


/**
 * @openapi
 * /bidder/mybids:
 *  get:
 *      tags:
 *      - Bidder
 *      summary: List all bids of a signed in bidder
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: an array of all user bids`
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array 
 *                          items: 
 *                              $ref: '#/components/schemas/Auction'
 *          500:
 *              description: unable to retrieve all your bids
 */


/**
 * @openapi
 * /auction:
 *  post:
 *      tags:
 *      - Auction
 *      summary: Create an Auction item
 *      security:
 *          - ApiKeyAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          base_price:
 *                              type: number
 *                          description:
 *                              type: string
 *                          start_time:
 *                              type: string
 *                          end_time:
 *                              type: string
 *                          category:
 *                              type: string
 *                              example: Database,Technology
 *                          image:
 *                              type: string
 *      responses:
 *          201:
 *              description: Auction created successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          $ref: '#/components/schemas/Auction'
 *          500:
 *              description: Unable to create auction
 */


/**
 * @openapi
 * /auction:
 *  get:
 *      tags:
 *      - Auction
 *      summary: returns all auctions in the database
 *      responses:
 *          200:
 *              description: an array of all auctions
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array 
 *                          items: 
 *                              $ref: '#/components/schemas/Auction'
 *          500:
 *              description: unable to retrieve all auctions    
 */

/**
 * @openapi
 * /auction/{auction_id}/bid:
 *  patch:
 *      tags:
 *      - Auction
 *      summary: Bid for an auction item
 *      parameters:
 *          - in: path
 *            name: auction_id
 *            schema:
 *              type: string 
 *              required: true
 *      security:
 *          - ApiKeyAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          price:
 *                              type: number
 *      responses:
 *          200:
 *              description: Bid successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          $ref: '#/components/schemas/Auction'
 *          400:
 *              description: Please include your bidding price.
 *          500:
 *              description: Unable to bid
 */


/**
 * @openapi
 * /auction/{auction_id}:
 *  get:
 *      tags:
 *      - Auction
 *      summary: retrieve an auction item
 *      parameters:
 *          - in: path
 *            name: auction_id
 *            schema:
 *              type: string 
 *              required: true
 *      responses:
 *          200:
 *              description: Auction retrieved successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object 
 *                          $ref: '#/components/schemas/Auction'
 *          500:
 *              description: unable to retrieve all auction
 */


/**
 * @openapi
 * /auction/{auction_id}:
 *  delete:
 *      tags:
 *      - Auction
 *      summary: delete an auction item
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - in: path
 *            name: auction_id
 *            schema:
 *              type: string 
 *              required: true
 *      responses:
 *          200:
 *              description: Auction deleted successfully
 *          403:
 *              description: Unauthorised - You are not the seller of this Auction
 *          404:
 *              description: The Auction does not exist
 *          500:
 *              description: unable to delete auction
 */

/**
 * @openapi
 * /category:
 *  post:
 *      tags:
 *      - Category
 *      summary: Create a Category item
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *      responses:
 *          201:
 *              description: Category created successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          $ref: '#/components/schemas/Category'
 *          500:
 *              description: Unable to create cateegory
 */

/**
 * @openapi
 * /category/{category}/auctions:
 *  get:
 *      tags:
 *      - Category
 *      summary: retrieve all auctions in a category
 *      parameters:
 *          - in: path
 *            name: category
 *            schema:
 *              type: string 
 *              required: true
 *      responses:
 *          200:
 *              description: All auctions in category retrieved successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Auction'
 *          500:
 *              description: unable to retrieve category auctions
 */