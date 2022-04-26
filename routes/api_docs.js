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
 *                          items: 
 *                              $ref: '#/components/schemas/Bidder'
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
 *                              $ref: '#/components/schemas/Bidder'
 *          500:
 *              description: unable to retrieve all your auctions    
 */



/**
 * @openapi
 * /auctions:
 *  get:
 *      tags:
 *      - Auctions
 *      summary: returns all auctions in the database
 *      responses:
 *          200:
 *              description: an array of all auctions
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array 
 *                          items: 
 *                              $ref: '#/components/schemas/Bidder'
 *          500:
 *              description: unable to retrieve all auctions    
 */