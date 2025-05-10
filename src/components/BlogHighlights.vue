<template>
    <section class="blog-highlights">
      <div class="container">
        <!-- Section Title -->
        <h2 class="section-title">Latest Articles</h2>
  
        <!-- Blog Post Previews Grid -->
        <div class="blog-grid">
          <div 
            class="blog-card" 
            v-for="(post, index) in blogPosts" 
            :key="index"
            @click="viewPost(post)"
          >
            <!-- Blog Image -->
            <img :src="post.image" :alt="post.title" class="blog-image" />
            
            <!-- Blog Title and Snippet -->
            <div class="blog-content">
              <h3 class="blog-title">{{ post.title }}</h3>
              <p class="blog-snippet">{{ post.snippet }}</p>
              <button class="read-more-btn">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "BlogHighlights",
    data() {
      return {
        blogPosts: [
          {
            title: "Master Vue.js with Expert Guidance",
            snippet: "Discover the best techniques to become proficient in Vue.js, starting from basics to advanced.",
            image: "path_to_image_1.jpg",
          },
          {
            title: "Top 10 Vue.js Tips and Tricks",
            snippet: "Enhance your Vue.js skills with these top tips and tricks from industry experts.",
            image: "path_to_image_2.jpg",
          },
          {
            title: "Building a Vue.js Project from Scratch",
            snippet: "A step-by-step guide to building your first Vue.js project, from setup to deployment.",
            image: "path_to_image_3.jpg",
          },
        ],
      };
    },
    methods: {
      viewPost(post) {
        alert(`You clicked on: ${post.title}`);
        // Replace alert with actual navigation logic to the full blog post page
      },
    },
  };
  </script>
  
  <style scoped>
  /* Blog Highlights Section */
  .blog-highlights {
    padding: 60px 20px;
    background-color: #fafafa;
    text-align: center;
  }
  
  .container {
    max-width: 1100px;
    margin: 0 auto;
  }
  
  /* Section Title */
  .section-title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 40px;
  }
  
  /* Blog Post Previews Grid */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  /* Blog Card */
  .blog-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  
  .blog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  /* Blog Image */
  .blog-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  /* Blog Content */
  .blog-content {
    padding: 20px;
  }
  
  .blog-title {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
  }
  
  .blog-snippet {
    font-size: 1rem;
    color: #666;
    margin-bottom: 20px;
  }
  
  /* Read More Button */
  .read-more-btn {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .read-more-btn:hover {
    background-color: #2980b9;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .blog-title {
      font-size: 1.25rem;
    }
  
    .blog-snippet {
      font-size: 0.9rem;
    }
  
    .read-more-btn {
      font-size: 0.9rem;
      padding: 8px 15px;
    }
  }
  
  @media (max-width: 480px) {
    .blog-title {
      font-size: 1.15rem;
    }
  
    .blog-snippet {
      font-size: 0.85rem;
    }
  
    .read-more-btn {
      font-size: 0.85rem;
      padding: 8px 12px;
    }
  }
  </style>
  