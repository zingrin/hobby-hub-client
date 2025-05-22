import { Link } from 'react-router';

import { ArrowRight, BookOpen, Users, MapPin } from 'lucide-react';
import { use } from 'react';
import AuthContext from '../Context/Context/Contex';
import HeroCarousel from '../Components/HeroCarousel';
import GroupListSkeleton from '../Components/GroupCardSkeleton';
import { useGroups } from '../Context/Context/GroupsContext';

const Index = () => {
  const { groups, loading } = useGroups();
  const { user } = use(AuthContext);

  // Filter active groups and limit to 6 for featured section
  const featuredGroups = groups
    .filter(group => new Date(group.startDate) > new Date())
    .sort(() => 0.5 - Math.random()) // Random shuffle
    .slice(0, 6);

  // Button styles similar to your custom Button component
  const buttonBaseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200";
  const buttonPrimaryClasses = "bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroCarousel />

        {/* Featured Groups Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-3">Featured Groups</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover active hobby groups in your area and join the community today.
              </p>
            </div>

            {loading ? (
              <GroupListSkeleton />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredGroups.map(group => (
                    <GroupCard key={group.id} group={group} />
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <Link
                    to="/groups"
                    className={`${buttonBaseClasses} ${buttonPrimaryClasses} gap-2`}
                    role="button"
                  >
                    Explore All Groups
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-3">How HobbyHub Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with people who share your interests and hobbies in just three simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="h-14 w-14 rounded-full hero-gradient text-white flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Discover</h3>
                <p className="text-muted-foreground">
                  Browse through a variety of hobby groups in your area and find the ones that match your interests.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="h-14 w-14 rounded-full hero-gradient text-white flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Join</h3>
                <p className="text-muted-foreground">
                  Become a member of the groups you like and start connecting with like-minded individuals.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="h-14 w-14 rounded-full hero-gradient text-white flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Meet Up</h3>
                <p className="text-muted-foreground">
                  Attend group meetings, events, and activities to share experiences and build lasting friendships.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              {user ? (
                <Link
                  to="/create-group"
                  className={`${buttonBaseClasses} ${buttonPrimaryClasses}`}
                  role="button"
                >
                  Create Your Own Group
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={`${buttonBaseClasses} ${buttonPrimaryClasses}`}
                  role="button"
                >
                  Sign Up to Get Started
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-3">What Our Members Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from people who have found their community through HobbyHub.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Emily Johnson',
                  image: 'https://randomuser.me/api/portraits/women/32.jpg',
                  text: "HobbyHub helped me find a local painting group. I've made amazing friends and improved my art skills dramatically!",
                  group: 'Urban Sketchers',
                },
                {
                  name: 'Marcus Chen',
                  image: 'https://randomuser.me/api/portraits/men/68.jpg',
                  text: "After moving to a new city, I joined a hiking group through HobbyHub. It's been the perfect way to explore my new home and meet people.",
                  group: 'Trail Blazers',
                },
                {
                  name: 'Sophia Williams',
                  image: 'https://randomuser.me/api/portraits/women/44.jpg',
                  text: "I started a book club on HobbyHub last year, and we now have 12 regular members who meet monthly. It's become the highlight of my month!",
                  group: 'Bookworms Club',
                },
              ].map((testimonial, index) => (
                <div key={index} className="p-6 rounded-lg border bg-card">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.group}</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
  
    </div>
  );
};

export default Index;
