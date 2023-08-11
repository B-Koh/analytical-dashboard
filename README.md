# HW4 - Analytics Dashboard

### Team
    Brandon Koh
    Jared Villaneva

### Site URL
    https://jaredvillanueva.com

### Basic Grader login:
    username: grader1
    password: grader1

### Admin Grader login: 
    username: grader
    username: grader

### Server Login
    username: grader
    password: grader
---
## Authenticitation

To provide auithentication for our users to log into the dashboard, we opted to use JSON Web Tokens (JWT).They are widely used for authentication in web applications. Some of the main reasons we chose JWTs:

1. **Stateless and Scalable**: The server does not need to store any session data or user information. This allows for easier scaling of the application, as the server does not need to keep track of active sessions or manage session data.

2. **Enhanced Security**: We digitally signed them using a secret key, providing a mechanism for validating the authenticity and integrity of the token. This prevents unauthorized modifications and ensures that the token can be trusted.

3. **Decentralized Authorization**: The server does not need to make additional database or network requests to validate the token. All the necessary information, such as whether the user is an admin or not is contained within the token itself. 

Essentially, we chose JWTs for authentication to provide a secure, scalable, and efficient approach to managing user authentication in our analytics dashboard.

---
## Dashboard

### Choice of Metrics
We carefully considered the metrics to report on, selecting those that are most relevant and meaningful for our target audience. The metrics chosen for our dashboard include:

1. **Languages**:  Tracking language usage allows us to understand the language preferences of our users. This information can be used to optimize the user experience, tailor content, and provide multilingual support if necessary. We measure the language metric by analyzing the browser settings or user preferences.

2. **User Activity**: Monitoring user activity, such as mouse movement, scrolling, and keyboard presses, provides valuable insights into user engagement and interaction patterns. By analyzing these metrics, we can identify areas of high engagement or potential usability issues, allowing us to optimize the design and user flow of our application.

3. **Page Load Performance**:  With the increasing prevalence of mobile and varying network conditions, it is crucial to understand how page load performance is affected by different network types. By measuring and comparing page load times for users on different network types (such as 3G, 4G, and Wi-Fi), we can identify performance bottlenecks and optimize the application for improved user experience across varying network conditions.

### Choice of Chart Types
To effectively visualize the data and communicate insights, we carefully selected appropriate chart types for each metric. Our choices were based on the nature of the data and the clarity of representation. The chart types chosen for our data analytics dashboard are as follows:

1. **Languages**:  A pie chart was selected to represent the distribution of languages used by our users. This chart type allows for a clear visualization of language preferences and the relative proportion of each language.

2. **User Activity**: We opted for a bar chart to visualize user activity metrics such as mouse movement, scrolling, and keyboard presses. The bar chart provides a clear comparison between different activity metrics, allowing users to quickly assess the level of engagement for each metric.

3. **Page Load Performance**: We chose a grid to display the page load performance based on different network types. The grid provides a tabular representation of the load times for each network type, allowing users to easily compare the performance across different conditions.

### Metrics Displayed
In our data analytics dashboard, we display the chosen metrics using a combination of numerical values and visualizations. This approach provides users with both a quick overview and the opportunity to delve deeper into the data. The metrics are displayed in the following ways:

1. **Languages**: The pie chart displays the distribution of languages used by our users, while numerical values indicate the percentage of users for each language.

2. **User Activity**: The bar chart visualizes user activity metrics, such as mouse movement, scrolling, and keyboard presses. Each activity metric is represented by a bar, and numerical values can be displayed on or alongside the bars to provide specific metrics quantification.

3. **Page Load Performance**: The grid displays the page load times for different network types in a tabular format. Each network type is represented by a row, and numerical values are displayed in the respective cells to show the average load times for each network category.

---
## Report

### Bar Chart: Average Load Time for Each Network Type
The bar chart in the report is designed to showcase the average load time for each network type. The x-axis represents the network types, while the y-axis displays the average load time in milliseconds. The primary goal of this chart is to provide a visual comparison of the load times across different network types.

### Grid: Load Time Details for Each Session
The grid complements the bar chart by providing more detailed information about the load times for each session. It displays the load start time, load end time, load event time, and network type for each session ID. Each ID represents a different session, allowing us to analyze load times on a per-session basis. 

### Conclusion
Overall, the combined use of the bar chart and grid in the report provides a comprehensive view of page load performance based on network type. The bar chart offers a quick visual understanding of the average load times, while the grid dives deeper into individual session load details, enabling a more granular analysis of load performance. This information empowers us to make data-driven decisions, optimize page load times, and enhance the overall user experience.