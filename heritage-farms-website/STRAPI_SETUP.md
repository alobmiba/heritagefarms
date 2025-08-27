# Strapi CMS Setup Guide for Heritage Farms

This guide outlines the steps to set up a Strapi instance to manage the content for the Heritage Farms website.

## 1. What is Strapi?

Strapi is a headless CMS (Content Management System). It provides an admin interface to manage content (like products, blog posts, etc.) and an API for our Next.js website to fetch that content.

## 2. Initial Setup

You can run Strapi locally or deploy it to a hosting service like Heroku, DigitalOcean, or the Strapi Cloud.

**To create a new Strapi project, run:**

```bash
npx create-strapi-app@latest heritage-farms-cms --quickstart
```

This will create a new Strapi project in a folder named `heritage-farms-cms` and launch the admin panel. Create your first admin user.

## 3. Creating Content Types

You will need to create "Collection Types" in the Strapi Content-Type Builder for each type of content we want to manage. Here are the recommended initial types:

### A. Product

This will hold all the product information.

-   **Display Name:** `Product`
-   **Fields:**
    -   `name` (Text, **Required**)
    -   `description` (Rich Text)
    -   `price` (Number - Decimal, **Required**)
    -   `sku` (Text, **Required**, Unique)
    -   `image` (Media - Single Media)
    -   `inventory` (Number - Integer, Default to 0)

### B. FAQ

For the Frequently Asked Questions section.

-   **Display Name:** `Faq`
-   **Fields:**
    -   `question` (Text, **Required**)
    -   `answer` (Rich Text)

### C. Team Member

For the "About Us" page.

-   **Display Name:** `Team Member`
-   **Fields:**
    -   `name` (Text, **Required**)
    -   `role` (Text)
    -   `bio` (Text)
    -   `avatar` (Media - Single Media)

## 4. Populating Content

Once you have created the Content Types, add some sample data for each type through the Strapi admin panel.

## 5. Setting API Permissions

By default, all content in Strapi is private. You need to make it publicly accessible via the API.

1.  Go to **Settings > Roles > Public**.
2.  For each Content Type (Product, Faq, etc.), find it in the list.
3.  Click on it and enable the `find` and `findOne` permissions. These allow the app to fetch lists of content and single entries.
4.  Click **Save**.

## 6. Getting API Credentials

The Next.js app needs two things to connect to Strapi:

1.  **The API URL:** This will be `http://localhost:1337` if you are running it locally, or the URL of your deployed Strapi instance.
2.  **An API Token:**
    1.  Go to **Settings > API Tokens > Create new API Token**.
    2.  Give it a name (e.g., `Next.js Website`).
    3.  Set the Token duration to "Unlimited".
    4.  Set the Token type to "Read-only".
    5.  Click **Save**.
    6.  **Copy the generated API token immediately.** You will not be able to see it again.

These values will be used in the `.env.local` file of the Next.js project.
