// lib/mockQuestions.ts
// Dummy/fallback questions mapped individually for every domain + technology
// combination from techMap, so the test page never breaks — even if the
// backend route is down or missing (404), or a domain/tech isn't seeded yet.
// Every domain + technology combination always returns exactly 30 questions.

export interface Question {
  id: number
  question_text: string
  question_type: string
  options: string[] | null
  marks: number
  coding_template: string | null
}

export interface MockTestData {
  session_id: number
  duration_minutes: number
  questions: Question[]
}

let idCounter = 1
const nextId = () => idCounter++

const mcq = (text: string, options: string[], marks = 2): Question => ({
  id: nextId(), question_text: text, question_type: 'MCQ', options, marks, coding_template: null,
})

const multiSelect = (text: string, options: string[], marks = 3): Question => ({
  id: nextId(), question_text: text, question_type: 'multi_select', options, marks, coding_template: null,
})

const coding = (text: string, template: string, marks = 5): Question => ({
  id: nextId(), question_text: text, question_type: 'coding', options: null, marks, coding_template: template,
})

const descriptive = (text: string, marks = 4): Question => ({
  id: nextId(), question_text: text, question_type: 'descriptive', options: null, marks, coding_template: null,
})

// ---------------------------------------------------------------------
// Domain + Technology individually mapped question sets (per techMap)
// ---------------------------------------------------------------------
const domainTechQuestions: Record<string, Record<string, Question[]>> = {

  'Frontend Developer': {
    'React': [
      mcq('Which hook is used to manage state in a functional React component?', ['useEffect', 'useState', 'useRef', 'useMemo']),
      mcq('What does the React "key" prop help with when rendering lists?', ['Styling', 'Efficient re-rendering/reconciliation', 'Routing', 'State management']),
    ],
    'Node.js': [
      mcq('Which module in Node.js is used to create an HTTP server?', ['fs', 'http', 'path', 'events']),
      mcq('What does "npm" stand for?', ['Node Package Manager', 'New Project Module', 'Node Process Monitor', 'Network Package Manager']),
    ],
  },

  'Backend Developer': {
    'Python': [
      mcq('Which keyword is used to define a function in Python?', ['func', 'def', 'function', 'lambda']),
      mcq('Which library is commonly used to build REST APIs in Python?', ['Flask', 'Pandas', 'NumPy', 'Matplotlib']),
    ],
    'Java': [
      mcq('Which keyword is used to inherit a class in Java?', ['implements', 'extends', 'inherits', 'super']),
      mcq('Which of these is NOT a primitive data type in Java?', ['int', 'boolean', 'String', 'char']),
    ],
    'Node.js': [
      mcq('Which approach is used to handle asynchronous operations in Node.js?', ['Callbacks', 'Promises', 'Async/await', 'All of the above']),
      mcq('Which package is most commonly used to build REST APIs with Node.js?', ['Express', 'React', 'Redux', 'Webpack']),
    ],
    '.NET': [
      mcq('Which language is primarily used to build .NET backend applications?', ['C#', 'Python', 'Ruby', 'PHP']),
      mcq('What does ORM stand for, commonly used in .NET (e.g. Entity Framework)?', ['Object Relational Mapping', 'Online Resource Management', 'Object Request Method', 'Open Runtime Module']),
    ],
    'C': [
      mcq('Which function is used to allocate memory dynamically in C?', ['malloc()', 'new', 'alloc()', 'create()']),
      mcq('What is the correct file extension for a C source file?', ['.c', '.cpp', '.java', '.py']),
    ],
    'C++': [
      mcq('Which concept allows a class to inherit properties from another class in C++?', ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction']),
      mcq('Which keyword is used to create a pointer in C++?', ['ptr', '*', '&', 'ref']),
    ],
  },

  'Full Stack Developer': {
    'Python': [
      mcq('Which Python framework is commonly used for full-stack web development?', ['Django', 'NumPy', 'Pandas', 'Matplotlib']),
      mcq('In a full-stack app, what does the "backend" typically handle?', ['UI rendering only', 'Business logic, database, APIs', 'CSS styling', 'Browser rendering']),
    ],
    'Java': [
      mcq('Which Java framework is widely used to build full-stack web applications?', ['Spring Boot', 'NumPy', 'React', 'jQuery']),
      mcq('Which of these is a templating engine often used with Java backends?', ['Thymeleaf', 'Pandas', 'Redux', 'Webpack']),
    ],
    'Node.js': [
      mcq('Which stack commonly refers to MongoDB, Express, React, and Node.js?', ['LAMP', 'MEAN', 'MERN', 'JAM']),
      mcq('In a full-stack Node.js app, which part typically renders the UI?', ['Express routes', 'Frontend framework (e.g. React)', 'Database', 'Middleware only']),
    ],
    '.NET': [
      mcq('Which Microsoft framework lets you build full-stack apps with C# on both client and server?', ['Blazor', 'Django', 'Express', 'Flask']),
      mcq('What is the role of a Controller in an ASP.NET MVC application?', ['Stores static files', 'Handles requests and business logic', 'Only renders CSS', 'Manages DNS']),
    ],
  },

  'Data Science': {
    'Python': [
      mcq('Which Python library is primarily used for data manipulation and analysis?', ['NumPy', 'Pandas', 'Matplotlib', 'Flask']),
      mcq('What does "overfitting" mean in a machine learning model?', ['Performs well on both train and test data', 'Performs well on train but poorly on unseen data', 'Model is too simple', 'Model has no parameters']),
    ],
  },

  'AI/ML': {
    'Python': [
      mcq('Which activation function is commonly used to introduce non-linearity in neural networks?', ['ReLU', 'Softmax only', 'Linear', 'Identity']),
      mcq('Which Python library is widely used for building deep learning models?', ['TensorFlow', 'Flask', 'Django', 'BeautifulSoup']),
    ],
  },
}

// ---------------------------------------------------------------------
// Domain-level question pools (30 each). Used as the fallback when
// technology is empty/"None / Not Sure"/unmapped, AND used to top up
// any tech-specific set so every combination always reaches 30 questions.
// ---------------------------------------------------------------------
const domainFallbackQuestions: Record<string, Question[]> = {
  'Frontend Developer': [
    mcq('What does CSS flexbox property "justify-content" control?', ['Vertical alignment of items', 'Horizontal alignment along main axis', 'Wrapping of items', 'Font size']),
    mcq('Which HTML tag is used to define an internal style sheet?', ['<css>', '<style>', '<script>', '<link>']),
    mcq('Which CSS property is used to change the text color of an element?', ['text-color', 'font-color', 'color', 'foreground-color']),
    mcq('Which CSS layout model is best suited for building responsive two-dimensional layouts?', ['Flexbox', 'CSS Grid', 'Float', 'Table']),
    mcq('What does "box-sizing: border-box" do?', ['Hides the box', 'Includes padding and border in element width/height', 'Removes borders', 'Adds a shadow']),
    mcq('Which JavaScript method is used to select an element by its id?', ['document.querySelectorAll()', 'document.getElementById()', 'document.getElementByClass()', 'document.select()']),
    mcq('What is the virtual DOM in React?', ['A backup of the real DOM stored in localStorage', 'An in-memory representation of the UI used for efficient updates', 'A CSS rendering engine', 'A browser extension']),
    mcq('Which media query syntax correctly targets screens narrower than 600px?', ['@media (max-width: 600px)', '@media (min-width: 600px)', '@screen (width < 600px)', '@responsive(600px)']),
    mcq('What does the acronym "SPA" stand for in frontend development?', ['Styled Page Application', 'Single Page Application', 'Simple Programming API', 'Scoped Page Architecture']),
    mcq('Which React hook lets you run side effects after render?', ['useState', 'useEffect', 'useContext', 'useReducer']),
    mcq('Which CSS unit scales relative to the root element font size?', ['em', 'rem', 'px', 'vh']),
    mcq('What is the purpose of the "alt" attribute on an <img> tag?', ['Sets image width', 'Provides alternative text for accessibility/SEO', 'Adds a border', 'Lazy loads the image']),
    mcq('Which of these is a CSS preprocessor?', ['SASS', 'Babel', 'Webpack', 'ESLint']),
    mcq('What does "event bubbling" mean in the DOM?', ['Events fire only once', 'An event propagates from the target element up through its ancestors', 'Events are cancelled automatically', 'Multiple events fire simultaneously']),
    mcq('Which tool is commonly used to bundle JavaScript modules for the browser?', ['Webpack', 'Pandas', 'Django', 'Postman']),
    mcq('What is the main benefit of using semantic HTML tags like <header>, <nav>, <article>?', ['Faster page load only', 'Better accessibility and SEO', 'Smaller file size', 'Automatic styling']),
    mcq('In CSS, what does "z-index" control?', ['Horizontal position', 'Stacking order along the z-axis', 'Font weight', 'Element opacity']),
    mcq('Which React concept allows passing data from a parent to a child component?', ['State', 'Props', 'Refs', 'Context only']),
    mcq('What does "responsive design" primarily aim to achieve?', ['Faster server response times', 'Layouts that adapt to different screen sizes', 'Reduced JavaScript bundle size', 'Better SEO rankings only']),
    mcq('Which HTTP status indicates a successful response?', ['200', '404', '500', '301']),
    multiSelect('Which of the following are valid ways to style a React component? (select all that apply)', ['Inline styles', 'CSS Modules', 'Styled Components', 'Tailwind CSS']),
    multiSelect('Which of these improve web accessibility? (select all that apply)', ['ARIA labels', 'Sufficient color contrast', 'Keyboard navigation support', 'Removing all alt text']),
    multiSelect('Which of these are valid CSS selectors? (select all that apply)', ['.class-name', '#id-name', '[data-attr]', '$element']),
    coding('Write a function that debounces another function by a given delay in milliseconds.', 'function debounce(fn, delay) {\n  // your code here\n}'),
    coding('Write a function that flattens a nested array by one level.', 'function flatten(arr) {\n  // your code here\n}'),
    coding('Write a function "toggleClass(el, className)" that toggles a CSS class on a DOM element.', 'function toggleClass(el, className) {\n  // your code here\n}'),
    descriptive('Explain the difference between "let", "const" and "var" in JavaScript.'),
    descriptive('Explain the difference between controlled and uncontrolled components in React.'),
    descriptive('Describe the CSS box model and its components.'),
    descriptive('Explain how you would optimize the performance of a React application that renders a large list.'),
  ],
  'Backend Developer': [
    mcq('Which HTTP method is idempotent?', ['POST', 'PUT', 'PATCH', 'CONNECT']),
    mcq('What is the primary purpose of an index in a relational database?', ['Encrypt data', 'Speed up read queries', 'Reduce storage size', 'Enforce foreign keys']),
    mcq('Which HTTP status code indicates "Not Found"?', ['200', '301', '404', '500']),
    mcq('What does REST stand for?', ['Representational State Transfer', 'Remote Execution State Transfer', 'Representational Service Technology', 'Remote State Translation']),
    mcq('What is the purpose of database normalization?', ['Increase redundancy', 'Reduce data redundancy and improve integrity', 'Speed up writes only', 'Encrypt tables']),
    mcq('What is the purpose of a load balancer in a backend system?', ['Encrypt traffic', 'Distribute incoming requests across multiple servers', 'Compress images', 'Store session data permanently']),
    mcq('Which HTTP status code range indicates a client error?', ['1xx', '2xx', '3xx', '4xx']),
    mcq('What is the main purpose of caching in a backend system?', ['Increase database size', 'Reduce repeated computation/DB calls and improve response time', 'Encrypt sensitive data', 'Replace the database entirely']),
    mcq('Which of these is a NoSQL database?', ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite']),
    mcq('What does CRUD stand for?', ['Create, Read, Update, Delete', 'Copy, Run, Undo, Deploy', 'Create, Run, Update, Deploy', 'Connect, Read, Update, Disconnect']),
    mcq('Which of these best describes a microservices architecture?', ['One large monolithic codebase', 'Independent, loosely-coupled services communicating over a network', 'A single database shared by all features', 'A frontend-only architecture pattern']),
    mcq('What is the purpose of a message queue (e.g. RabbitMQ, Kafka) in backend systems?', ['Store images', 'Enable asynchronous communication between services', 'Render HTML pages', 'Compile source code']),
    mcq('Which HTTP header is commonly used to send authentication tokens?', ['Content-Type', 'Authorization', 'Accept-Language', 'Cache-Control']),
    mcq('What is the purpose of a reverse proxy like Nginx?', ['Compile frontend code', 'Forward client requests to backend servers and handle load balancing/SSL', 'Store user sessions permanently', 'Write database migrations']),
    mcq('Which protocol is primarily used for secure data transfer over the web?', ['HTTP', 'HTTPS', 'FTP', 'SMTP']),
    mcq('What is the purpose of database transactions?', ['Speed up queries only', 'Ensure a group of operations either fully completes or fully fails', 'Encrypt the database', 'Reduce table size']),
    mcq('Which of these is typically used for session/token-based authentication?', ['JWT', 'CSS', 'HTML', 'SASS']),
    mcq('What is the purpose of an API rate limiter?', ['Speed up the database', 'Prevent abuse by limiting how many requests a client can make', 'Style API responses', 'Compress images']),
    mcq('Which of these is a common way to version an API?', ['Via the URL path (e.g. /api/v1/)', 'By renaming the database', 'By changing the frontend framework', 'By deleting old endpoints silently']),
    mcq('What does "statelessness" mean in the context of REST APIs?', ['The server stores all client state', 'Each request contains all information needed; the server stores no client session state', 'The client never sends data', 'The API has no endpoints']),
    multiSelect('Which of these are valid ways to handle authentication in an API? (select all that apply)', ['JWT', 'Session cookies', 'OAuth2', 'CSS']),
    multiSelect('Which of these are common causes of SQL injection vulnerabilities? (select all that apply)', ['Concatenating raw user input into SQL queries', 'Using parameterized queries', 'Not validating/sanitizing input', 'Using an ORM with prepared statements']),
    multiSelect('Which of these are valid HTTP methods? (select all that apply)', ['GET', 'POST', 'FETCH', 'DELETE']),
    coding('Write a function to reverse a singly linked list.', 'function reverseList(head) {\n  // your code here\n}'),
    coding('Write a function that checks whether a given string of brackets is balanced.', 'function isBalanced(str) {\n  // your code here\n}'),
    coding('Write a function that returns the nth Fibonacci number using an efficient approach.', 'function fibonacci(n) {\n  // your code here\n}'),
    descriptive('Explain the difference between SQL and NoSQL databases with an example use case for each.'),
    descriptive('Explain the difference between authentication and authorization.'),
    descriptive('Describe how you would design a rate limiter for a public API.'),
    descriptive('Explain the concept of database transactions and ACID properties.'),
  ],
  'Full Stack Developer': [
    mcq('In a typical MVC architecture, what does the Controller do?', ['Stores data', 'Handles business logic and routes requests', 'Renders UI only', 'Manages database migrations']),
    mcq('Which of the following is used for client-server communication in real time?', ['REST only', 'WebSockets', 'FTP', 'SMTP']),
    mcq('What is the purpose of environment variables in a full-stack application?', ['Store UI components', 'Keep configuration/secrets out of source code', 'Style the frontend', 'Compress images']),
    mcq('What is the role of an API gateway in a full-stack system?', ['Renders HTML', 'Routes and manages requests to backend services', 'Stores files permanently', 'Compiles frontend code']),
    mcq('Which tool is commonly used for containerizing full-stack applications?', ['Docker', 'Photoshop', 'Figma', 'Excel']),
    mcq('What does CI/CD stand for?', ['Continuous Integration / Continuous Deployment', 'Code Inspection / Code Delivery', 'Central Index / Central Database', 'Client Interface / Client Deployment']),
    mcq('What is the purpose of a reverse proxy in a full-stack deployment?', ['Compile frontend code', 'Forward client requests to backend servers and handle load balancing/SSL', 'Store user sessions permanently', 'Write database migrations']),
    mcq('Which of these best describes "server-side rendering" (SSR)?', ['HTML is generated in the browser only', 'HTML is generated on the server and sent to the client', 'No HTML is used', 'CSS is compiled on the server']),
    mcq('What is the purpose of version control systems like Git?', ['Deploy applications automatically', 'Track and manage changes to source code collaboratively', 'Style web pages', 'Optimize database queries']),
    mcq('What is the main advantage of using a monorepo for a full-stack project?', ['Smaller codebase automatically', 'Shared code/config and easier cross-team coordination in one repository', 'No need for version control', 'Removes the need for testing']),
    mcq('Which of these is typically used to manage frontend application state in large apps?', ['Redux', 'Flask', 'Django ORM', 'Nginx']),
    mcq('What is the purpose of database migrations?', ['Backup user passwords', 'Version-control and apply incremental changes to a database schema', 'Encrypt the frontend', 'Compress static assets']),
    mcq('Which deployment strategy releases a new version to a small subset of users first?', ['Blue-green deployment', 'Canary deployment', 'Big bang deployment', 'Rollback deployment']),
    mcq('What is the purpose of unit testing in full-stack development?', ['Replace documentation', 'Verify individual components/functions work correctly in isolation', 'Deploy the application', 'Design the UI']),
    mcq('Which of these is a common way to share types between frontend and backend in a full-stack TypeScript app?', ['A shared types package', 'Copy-pasting manually only', 'Not possible', 'Using CSS variables']),
    mcq('What is the purpose of a CDN (Content Delivery Network)?', ['Store database backups', 'Serve static assets quickly from locations close to users', 'Compile backend code', 'Manage user authentication']),
    mcq('Which of these is an example of infrastructure as code?', ['Terraform', 'Figma', 'Photoshop', 'Postman']),
    mcq('What is the purpose of logging and monitoring in a production full-stack app?', ['Style the UI', 'Detect, diagnose, and track issues in real time', 'Replace automated tests', 'Reduce bundle size']),
    mcq('Which of these is a common pattern for handling errors consistently across a full-stack app?', ['Centralized error handling middleware', 'Ignoring all errors', 'Only logging errors on the frontend', 'Returning HTML for every error']),
    mcq('What is the purpose of a .env file in a full-stack project?', ['Store compiled binaries', 'Store environment-specific configuration and secrets', 'Store UI components', 'Store database backups']),
    multiSelect('Which of these are considered good practices for full-stack app deployment? (select all that apply)', ['Environment variables for secrets', 'CI/CD pipelines', 'Hardcoding API keys', 'Containerization with Docker']),
    multiSelect('Which of these are frontend state management or data-fetching tools? (select all that apply)', ['Redux', 'React Query', 'Express', 'Zustand']),
    multiSelect('Which of these are valid parts of a typical full-stack request/response cycle? (select all that apply)', ['Client sends HTTP request', 'Server processes request and queries database', 'Server returns a response', 'Database renders the UI']),
    coding('Write a function that takes an array of objects and groups them by a given key.', 'function groupBy(arr, key) {\n  // your code here\n}'),
    coding('Write a function that validates whether a given string is a valid email format.', 'function isValidEmail(email) {\n  // your code here\n}'),
    coding('Write a function that implements a simple in-memory cache with a get/set interface.', 'function createCache() {\n  // your code here\n}'),
    descriptive('Describe how you would design the architecture of a scalable full-stack web application.'),
    descriptive('Explain the difference between client-side rendering and server-side rendering, and when you would use each.'),
    descriptive('Describe your approach to handling errors consistently across both frontend and backend.'),
    descriptive('Explain how you would secure a full-stack application against common vulnerabilities (e.g. XSS, CSRF, SQL injection).'),
  ],
  'Data Science': [
    mcq('Which Python library is primarily used for data manipulation and analysis?', ['NumPy', 'Pandas', 'Matplotlib', 'Flask']),
    mcq('What does "overfitting" mean in a machine learning model?', ['Model performs well on both train and test data', 'Model performs well on train but poorly on unseen data', 'Model is too simple', 'Model has no parameters']),
    mcq('Which measure describes the spread of a dataset around its mean?', ['Median', 'Standard deviation', 'Mode', 'Range only']),
    mcq('Which Python library is commonly used for numerical computing with arrays?', ['NumPy', 'Flask', 'Django', 'BeautifulSoup']),
    mcq('What is the purpose of a correlation matrix?', ['Show missing values', 'Show pairwise relationships between variables', 'Normalize data', 'Encode categorical variables']),
    mcq('Which chart type is best suited for showing the distribution of a single numeric variable?', ['Pie chart', 'Histogram', 'Scatter plot', 'Bar chart only']),
    mcq('What does "p-value" represent in hypothesis testing?', ['The probability the null hypothesis is true', 'The probability of observing results as extreme, assuming the null hypothesis is true', 'The sample size', 'The confidence interval width']),
    mcq('Which technique is used to handle missing values by replacing them with the mean/median/mode?', ['Normalization', 'Imputation', 'Encoding', 'Standardization']),
    mcq('What is the purpose of train-test split in machine learning?', ['Speed up training', 'Evaluate model performance on unseen data', 'Reduce dataset size permanently', 'Remove outliers']),
    mcq('Which metric is commonly used to evaluate classification models?', ['Mean Squared Error', 'Accuracy', 'R-squared', 'Standard deviation']),
    mcq('What does "feature engineering" refer to?', ['Deploying a model to production', 'Creating new input variables to improve model performance', 'Cleaning the server logs', 'Visualizing the final results only']),
    mcq('Which Python library is widely used for data visualization?', ['Matplotlib', 'Flask', 'Django', 'Requests']),
    mcq('What is a common technique to handle categorical variables before modeling?', ['One-hot encoding', 'Standard deviation', 'Mean imputation', 'Z-score only']),
    mcq('What does "bias" refer to in the context of a machine learning model?', ['Error due to overly simplistic assumptions in the model', 'The size of the dataset', 'The number of features', 'The programming language used']),
    mcq('Which of the following is an unsupervised learning algorithm?', ['Linear Regression', 'K-Means Clustering', 'Logistic Regression', 'Decision Tree Classification']),
    mcq('What is the purpose of cross-validation?', ['Increase dataset size', 'Get a more reliable estimate of model performance', 'Remove duplicate rows', 'Encode text data']),
    mcq('Which pandas function is used to read a CSV file into a DataFrame?', ['pd.read_csv()', 'pd.load_csv()', 'pd.open_csv()', 'pd.import_csv()']),
    mcq('What does "normalization" typically do to numeric data?', ['Removes all outliers', 'Scales values to a common range (e.g. 0 to 1)', 'Converts text to numbers', 'Deletes missing values']),
    mcq('Which of these best describes an outlier?', ['The average value in a dataset', 'A data point significantly different from other observations', 'A missing value', 'A categorical variable']),
    mcq('What is the primary goal of exploratory data analysis (EDA)?', ['Deploy the final model', 'Understand data patterns, distributions, and relationships before modeling', 'Write production code', 'Design the user interface']),
    multiSelect('Which of these are common data cleaning steps? (select all that apply)', ['Handling missing values', 'Removing duplicates', 'Encoding categorical variables', 'Training the final model']),
    multiSelect('Which of these are supervised learning tasks? (select all that apply)', ['Regression', 'Classification', 'Clustering', 'Dimensionality reduction only']),
    multiSelect('Which of these are common ways to evaluate a regression model? (select all that apply)', ['Mean Absolute Error', 'R-squared', 'Accuracy', 'Root Mean Squared Error']),
    coding('Write a function using pandas-style pseudocode to compute the mean of a column while ignoring NaN values.', 'def column_mean(df, column):\n    # your code here\n    pass'),
    coding('Write a function that normalizes a list of numbers to a 0-1 range (min-max scaling).', 'def min_max_normalize(values):\n    # your code here\n    pass'),
    coding('Write a function that removes duplicate rows from a list of dictionaries based on a given key.', 'def remove_duplicates(records, key):\n    # your code here\n    pass'),
    descriptive('Explain the difference between supervised and unsupervised learning with an example each.'),
    descriptive('Explain the difference between correlation and causation.'),
    descriptive('Describe how you would handle a dataset with a significant number of missing values.'),
    descriptive('Explain the bias-variance tradeoff and why it matters in model selection.'),
  ],
  'AI/ML': [
    mcq('Which activation function is commonly used to introduce non-linearity in hidden layers?', ['ReLU', 'Softmax only', 'Linear', 'Identity']),
    mcq('What is the purpose of a loss function in training a neural network?', ['Store weights', 'Measure prediction error to guide optimization', 'Visualize data', 'Load datasets']),
    mcq('Which Python library is widely used for building deep learning models?', ['TensorFlow', 'Flask', 'Django', 'BeautifulSoup']),
    mcq('What does "backpropagation" do in neural network training?', ['Loads the training data', 'Computes gradients and propagates error backward to update weights', 'Visualizes the model architecture', 'Splits data into train/test sets']),
    mcq('Which of these is a common optimization algorithm used in deep learning?', ['Adam', 'Bubble Sort', 'Dijkstra', 'Quick Sort']),
    mcq('What is the purpose of a convolutional layer in a CNN?', ['Classify text', 'Extract spatial features from images using filters', 'Store labels', 'Normalize the loss function']),
    mcq('Which neural network architecture is best suited for sequential data like text or time series?', ['CNN', 'RNN/LSTM', 'Autoencoder', 'GAN only']),
    mcq('What does "epoch" mean in the context of training a neural network?', ['One pass through the entire training dataset', 'A single data point', 'The learning rate value', 'The number of layers in the model']),
    mcq('What is the purpose of the softmax function?', ['Remove outliers', 'Convert raw scores into a probability distribution over classes', 'Normalize images', 'Reduce model size']),
    mcq('Which technique is commonly used to prevent overfitting in deep neural networks?', ['Increasing model size indefinitely', 'Dropout', 'Removing all regularization', 'Using a higher learning rate only']),
    mcq('What does NLP stand for?', ['Natural Language Processing', 'Neural Learning Protocol', 'Network Layer Protocol', 'Non-Linear Programming']),
    mcq('What is "transfer learning" in machine learning?', ['Training a model from scratch every time', 'Reusing a pre-trained model and fine-tuning it for a new task', 'Transferring data between databases', 'Converting a model to a different programming language']),
    mcq('Which of these is a common evaluation metric for classification models?', ['F1 score', 'Mean Squared Error', 'R-squared', 'Standard deviation']),
    mcq('What does "gradient descent" aim to do?', ['Increase the loss function value', 'Iteratively minimize the loss function by updating parameters', 'Visualize the dataset', 'Split data into batches only']),
    mcq('What is a "hyperparameter" in machine learning?', ['A parameter learned automatically during training', 'A configuration value set before training (e.g. learning rate)', 'The final model output', 'A type of neural network layer']),
    mcq('Which of these best describes an autoencoder?', ['A supervised classification model', 'A neural network trained to reconstruct its input, often used for dimensionality reduction', 'A reinforcement learning algorithm', 'A database indexing technique']),
    mcq('What does "GAN" stand for in machine learning?', ['General Analysis Network', 'Generative Adversarial Network', 'Gradient Aggregation Node', 'Global Attention Network']),
    mcq('What is the purpose of tokenization in NLP?', ['Encrypt text data', 'Break text into smaller units like words or subwords for processing', 'Visualize sentence structure', 'Translate text automatically']),
    mcq('Which of these is a common technique for reducing the dimensionality of data?', ['PCA (Principal Component Analysis)', 'One-hot encoding', 'Cross-validation', 'Data augmentation only']),
    mcq('What is "reinforcement learning" primarily based on?', ['Labeled input-output pairs', 'An agent learning by interacting with an environment and receiving rewards', 'Clustering unlabeled data', 'Reconstructing input data']),
    multiSelect('Which of these are common techniques to reduce overfitting? (select all that apply)', ['Dropout', 'L2 Regularization', 'Increasing model size infinitely', 'Early stopping']),
    multiSelect('Which of these are common deep learning frameworks? (select all that apply)', ['TensorFlow', 'PyTorch', 'Pandas', 'Keras']),
    multiSelect('Which of these are valid applications of NLP? (select all that apply)', ['Sentiment analysis', 'Machine translation', 'Image classification', 'Named entity recognition']),
    coding('Write a function that computes the sigmoid of a given input value.', 'function sigmoid(x) {\n  // your code here\n}'),
    coding('Write a function that computes the softmax of a list of numbers.', 'function softmax(values) {\n  // your code here\n}'),
    coding('Write a function that calculates the mean squared error between two arrays of equal length.', 'function meanSquaredError(yTrue, yPred) {\n  // your code here\n}'),
    descriptive('Explain the bias-variance tradeoff in machine learning.'),
    descriptive('Explain the difference between a CNN and an RNN, and when you would use each.'),
    descriptive('Describe how you would approach fine-tuning a pre-trained language model for a custom task.'),
    descriptive('Explain the difference between precision and recall, and a scenario where you would prioritize one over the other.'),
  ],
}

const DEFAULT_FALLBACK = domainFallbackQuestions['Full Stack Developer']
const TARGET_COUNT = 30

/**
 * Returns dummy test data for a given domain + technology, always exactly
 * 30 questions.
 * Lookup order:
 *   1. Tech-specific questions (from techMap combinations) placed first.
 *   2. Topped up with domain-level questions until the total reaches 30.
 *   3. Falls back entirely to Full Stack Developer's 30 if the domain itself
 *      isn't recognized.
 * This guarantees every single domain + technology combination always
 * returns a full 30-question test — no error, no blank screen.
 */
export function getMockTestData(domain: string, technology?: string): MockTestData {
  const techSpecific = technology ? domainTechQuestions[domain]?.[technology] : undefined
  const domainGeneric = domainFallbackQuestions[domain] || DEFAULT_FALLBACK

  let combined: Question[] = techSpecific && techSpecific.length > 0
    ? [...techSpecific, ...domainGeneric]
    : [...domainGeneric]

  // Top up to exactly 30 by cycling through the domain pool (fresh ids) if short
  let cycleIndex = 0
  while (combined.length < TARGET_COUNT) {
    const extra = domainGeneric[cycleIndex % domainGeneric.length]
    combined.push({ ...extra, id: nextId() })
    cycleIndex++
  }

  // Trim to exactly 30 if the combination produced more
  if (combined.length > TARGET_COUNT) {
    combined = combined.slice(0, TARGET_COUNT)
  }

  return {
    session_id: Math.floor(Math.random() * 1000000),
    duration_minutes: 30,
    questions: combined,
  }
}