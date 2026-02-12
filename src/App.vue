<template>
  <div class="app-container">
    <!-- 1. Header/Navbar -->
    <WbNavbar variant="light" position="static">
      <template #brand>
        <WbLogo text="Wishbone" variant="dark" size="medium" />
      </template>
      
      <template #items>
        <WbLink href="#about" variant="secondary" size="medium">About</WbLink>
        <WbLink href="#projects" variant="secondary" size="medium">Projects</WbLink>
        <WbLink href="#news" variant="secondary" size="medium">News</WbLink>
        <WbLink href="#team" variant="secondary" size="medium">Team</WbLink>
        <WbLink href="#contact" variant="secondary" size="medium">Contact</WbLink>
      </template>
      
      <template #actions>
        <WbButton variant="primary" size="medium">Get template</WbButton>
      </template>
    </WbNavbar>

    <!-- 2. Hero Section -->
    <section id="hero">
      <WbHero
        badge="Wishbone+Partners"
        title="The home of beautiful architecture."
        description="We are a visionary architecture firm dedicated to crafting spaces that inspire, endure, and transform the way we live."
        :primary-button="{ text: 'Read more', variant: 'primary' }"
        :image="{
          src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
          alt: 'Beautiful modern architecture'
        }"
        variant="default"
      />
    </section>

    <!-- 3. API Demo Section -->
    <ApiDemo />

    <!-- 4. Our Firm Section -->
    <WbSection variant="default" size="large">
      <WbContainer size="large">
        <div class="our-firm">
          <WbGrid :columns="2" gap="large" :mobile-columns="1" :tablet-columns="1">
            <div class="our-firm__content">
              <WbSectionHeader
                title="Our firm"
                subtitle="We believe that great architecture starts with understanding the unique needs and aspirations of our clients."
                level="h2"
                align="left"
                size="large"
              />
              <p class="our-firm__text">
                Founded in 2010, Wishbone+Partners has established itself as a leader in innovative architectural design. Our approach combines timeless principles with contemporary thinking to create spaces that are both functional and beautiful.
              </p>
              <p class="our-firm__text">
                With over 50 completed projects across 3 continents, we bring a global perspective to every project while maintaining a deeply personal approach to design.
              </p>
              <p class="our-firm__text">
                Our team of architects, designers, and planners work collaboratively to deliver exceptional results that exceed expectations.
              </p>
            </div>
            <div class="our-firm__image">
              <WbImage
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80"
                alt="Stephen Collier - Senior Partner"
                :rounded="true"
                shadow="large"
              />
            </div>
          </WbGrid>
        </div>
      </WbContainer>
    </WbSection>

    <!-- 4. Featured Project 1 (Reeding House) -->
    <WbFeaturedProject
      :image="{
        src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        alt: 'Reeding House'
      }"
      title="Reeding House"
      description="A stunning residential project that seamlessly integrates with its natural surroundings, featuring sustainable materials and innovative design solutions."
      variant="light"
    />

    <!-- 5. Our Process Section -->
    <WbSection variant="secondary" size="large">
      <WbContainer size="large">
        <div class="our-process">
          <WbSectionHeader
            title="How we do what we do."
            subtitle="Our process is collaborative, transparent, and focused on delivering exceptional results."
            level="h2"
            align="center"
            size="large"
          />
          <WbGrid :columns="3" gap="large" :mobile-columns="1" :tablet-columns="2">
            <WbProcessCard
              number="01"
              title="Sketching"
              description="We begin with understanding your vision, sketching initial concepts and exploring possibilities through hand-drawn and digital renderings."
            />
            <WbProcessCard
              number="02"
              title="Finalizing"
              description="Through iterative refinement, we develop the design, incorporating feedback and ensuring every detail meets our high standards."
            />
            <WbProcessCard
              number="03"
              title="Building"
              description="We work closely with contractors and craftsmen to bring the design to life, overseeing every stage of construction with meticulous attention."
            />
          </WbGrid>
        </div>
      </WbContainer>
    </WbSection>

    <!-- 6. Featured Project 2 (The marble staircase) -->
    <WbFeaturedProject
      :image="{
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        alt: 'The marble staircase'
      }"
      title="The Marble Staircase"
      description="An elegant residential project featuring a breathtaking marble staircase that serves as the centerpiece of the home."
      variant="light"
    />

    <!-- 7. Prior Clients Section -->
    <WbSection variant="default" size="large">
      <WbContainer size="large">
        <div class="prior-clients">
          <div class="prior-clients__header">
            <WbBadge variant="secondary" rounded>Prior clients</WbBadge>
            <h2 class="prior-clients__title">Happy customers.</h2>
          </div>
          <div class="prior-clients__grid">
            <WbClientLogo
              v-for="client in clientLogos"
              :key="client.name"
              :src="client.src"
              :name="client.name"
              variant="grayscale"
              size="large"
            />
          </div>
        </div>
      </WbContainer>
    </WbSection>

    <!-- 8. Featured Project 3 (The swirling staircase) -->
    <WbFeaturedProject
      :image="{
        src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
        alt: 'The swirling staircase'
      }"
      title="The Swirling Staircase"
      description="A commercial masterpiece featuring an iconic spiral staircase that defines the entire space with its fluid form."
      variant="light"
    />

    <!-- 9. Featured Projects Grid -->
    <WbSection variant="default" size="large">
      <WbContainer size="large">
        <div class="featured-projects">
          <WbSectionHeader
            title="Featured projects"
            subtitle="Some of the latest and greatest projects from our talented team of architects and designers."
            level="h2"
            align="center"
            size="large"
          />
          <WbGrid :columns="3" gap="large" :mobile-columns="1" :tablet-columns="2">
            <WbProjectCard
              :image="{
                src: 'https://images.unsplash.com/photo-1556912173-3db996eaaf46?w=600&q=80',
                alt: 'Pumpkin St. Bar'
              }"
              title="Pumpkin St. Bar"
              category="Restaurant"
              location="Malmö"
              description="A modern bar design that combines industrial elements with warm, inviting atmospheres."
              :link="{ text: 'Read more', href: '#' }"
              variant="default"
            />
            <WbProjectCard
              :image="{
                src: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80',
                alt: 'Big Road Brewery'
              }"
              title="Big Road Brewery"
              category="Commercial"
              location="New York"
              description="A spacious brewery interior featuring rustic materials and contemporary design elements."
              :link="{ text: 'Read more', href: '#' }"
              variant="default"
            />
            <WbProjectCard
              :image="{
                src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
                alt: 'Lupin London'
              }"
              title="Lupin London"
              category="Retail"
              location="London"
              description="A boutique retail space designed to showcase luxury products in an elegant setting."
              :link="{ text: 'Read more', href: '#' }"
              variant="default"
            />
          </WbGrid>
          <div class="featured-projects__actions">
            <WbButton variant="outline" size="large">View all projects</WbButton>
          </div>
        </div>
      </WbContainer>
    </WbSection>

    <!-- 10. Meet Our Team Section -->
    <WbSection variant="secondary" size="large">
      <WbContainer size="large">
        <div class="meet-team">
          <WbSectionHeader
            title="Meet our team"
            subtitle="Our talented team of architects and designers are passionate about creating exceptional spaces."
            level="h2"
            align="left"
            size="large"
          />
          <WbGrid :columns="5" gap="large" :mobile-columns="1" :tablet-columns="2">
            <WbTeamCard
              :image="{
                src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
                alt: 'Stephen Collier'
              }"
              name="Stephen Collier"
              position="Senior Partner"
              :social-links="[
                { network: 'twitter', href: '#', label: 'Twitter' },
                { network: 'linkedin', href: '#', label: 'LinkedIn' }
              ]"
              variant="default"
            />
            <WbTeamCard
              :image="{
                src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
                alt: 'Nolan Peters'
              }"
              name="Nolan Peters"
              position="Associate"
              :social-links="[
                { network: 'twitter', href: '#', label: 'Twitter' },
                { network: 'linkedin', href: '#', label: 'LinkedIn' }
              ]"
              variant="default"
            />
            <WbTeamCard
              :image="{
                src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
                alt: 'Ferris Wonder'
              }"
              name="Ferris Wonder"
              position="Associate Partner"
              :social-links="[
                { network: 'twitter', href: '#', label: 'Twitter' },
                { network: 'linkedin', href: '#', label: 'LinkedIn' }
              ]"
              variant="default"
            />
            <WbTeamCard
              :image="{
                src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
                alt: 'Aria Stone'
              }"
              name="Aria Stone"
              position="Senior Partner"
              :social-links="[
                { network: 'twitter', href: '#', label: 'Twitter' },
                { network: 'linkedin', href: '#', label: 'LinkedIn' }
              ]"
              variant="default"
            />
            <WbTeamCard
              :image="{
                src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
                alt: 'Niko Ferry'
              }"
              name="Niko Ferry"
              position="Partner"
              :social-links="[
                { network: 'twitter', href: '#', label: 'Twitter' },
                { network: 'linkedin', href: '#', label: 'LinkedIn' }
              ]"
              variant="default"
            />
          </WbGrid>
          <div class="meet-team__actions">
            <WbButton variant="primary" size="large">See team</WbButton>
          </div>
        </div>
      </WbContainer>
    </WbSection>

    <!-- 12. CTA Section -->
    <WbCTA
      title="Think we would be a good fit for your next project?"
      description="Let's discuss how we can bring your vision to life. Contact us today to schedule a consultation."
      :primary-action="{ text: 'Get in touch', variant: 'primary' }"
      variant="dark"
    />

    <!-- 13. Footer -->
    <WbFooter
      logo-text="Wishbone"
      tagline="The home of beautiful architecture."
      :social-links="[
        { network: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
        { network: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
        { network: 'facebook', href: 'https://facebook.com', label: 'Facebook' }
      ]"
      :navigation="[
        {
          title: 'Company',
          links: [
            { text: 'About', href: '#' },
            { text: 'Projects', href: '#' },
            { text: 'News', href: '#' }
          ]
        },
        {
          title: 'Support',
          links: [
            { text: 'Contact', href: '#' },
            { text: 'FAQ', href: '#' }
          ]
        },
        {
          title: 'Legal',
          links: [
            { text: 'Licensing', href: '#' },
            { text: 'Privacy', href: '#' }
          ]
        }
      ]"
      copyright="All rights reserved Wishbone+Partners, Inc."
      :legal-links="[
        { text: 'Licensing', href: '#' },
        { text: 'Privacy Policy', href: '#' }
      ]"
      variant="default"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WbNavbar from './components/WbNavbar.vue'
import WbLogo from './components/WbLogo.vue'
import WbLink from './components/WbLink.vue'
import WbButton from './components/WbButton.vue'
import WbHero from './components/WbHero.vue'
import WbSection from './components/WbSection.vue'
import WbContainer from './components/WbContainer.vue'
import WbGrid from './components/WbGrid.vue'
import WbSectionHeader from './components/WbSectionHeader.vue'
import WbImage from './components/WbImage.vue'
import WbFeaturedProject from './components/WbFeaturedProject.vue'
import WbProcessCard from './components/WbProcessCard.vue'
import WbBadge from './components/WbBadge.vue'
import WbClientLogo from './components/WbClientLogo.vue'
import WbProjectCard from './components/WbProjectCard.vue'
import WbTeamCard from './components/WbTeamCard.vue'
import WbCTA from './components/WbCTA.vue'
import WbFooter from './components/WbFooter.vue'
import WbSocialIcon from './components/WbSocialIcon.vue'
import ApiDemo from './components/ApiDemo.vue'

// Client logos data
const clientLogos = ref([
  { name: 'Adobe', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Oikya_Front_Logo.png/640px-Oikya_Front_Logo.png' },
  { name: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png' },
  { name: 'Netflix', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png' },
  { name: 'Spotify', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/512px-Spotify_logo_without_text.svg.png' },
  { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png' }
])
</script>

<style scoped>
.app-container {
  min-height: 100vh;
}

/* Our Firm Section */
.our-firm {
  padding: var(--wb-spacing-xl) 0;
}

.our-firm__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.our-firm__text {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-lg);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-600);
  line-height: var(--wb-line-height-base);
  margin-bottom: var(--wb-spacing-md);
}

.our-firm__image {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Our Process Section */
.our-process {
  text-align: center;
}

/* Prior Clients Section */
.prior-clients {
  text-align: center;
}

.prior-clients__header {
  margin-bottom: var(--wb-spacing-xl);
}

.prior-clients__title {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-3xl);
  font-weight: var(--wb-font-weight-bold);
  color: var(--wb-color-gray-900);
  margin-top: var(--wb-spacing-md);
}

.prior-clients__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--wb-spacing-2xl);
}

/* Featured Projects Section */
.featured-projects {
  text-align: center;
}

.featured-projects__actions {
  margin-top: var(--wb-spacing-xl);
}

/* Meet Team Section */
.meet-team {
  position: relative;
}

.meet-team__actions {
  margin-top: var(--wb-spacing-xl);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .our-firm__content {
    order: 2;
  }
  
  .our-firm__image {
    order: 1;
    margin-bottom: var(--wb-spacing-lg);
  }
  
  .prior-clients__grid {
    gap: var(--wb-spacing-lg);
  }
}
</style>
