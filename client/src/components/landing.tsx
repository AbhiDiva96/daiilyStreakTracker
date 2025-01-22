import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Github, LineChart, Calendar, Zap, ArrowRight } from "lucide-react"
import {Link, useNavigate } from "react-router-dom";

export const  LandingPage = () => {
      const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <Link className="flex items-center justify-center" to="#">
          <Github className="h-6 w-6 mr-2" />
          <span className="font-bold">StreakTracker</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#faq">
            FAQ
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-10 md:py-24 lg:py-20 xl:py-40 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                     <h1 className="text-3xl md:px-32 font-sans  font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        Now easily get track of you daily contribution on github
                </h1>  
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Track your GitHub streaks, set goals, and stay motivated with our premium features.
                </p>
              </div>
              <div className="space-x-4 py-4">
                <Button className="bg-green-500 hover:bg-green-600 text-white"
                   onClick={()=>{navigate('/home')}}
                >Get Started</Button>
                <Button variant="outline" className="text-black border-white hover:bg-gray-800 hover:text-white dark:text-white dark:border-white dark:hover:bg-gray-800">
                  Learn More
                </Button>
              </div>
               <h2 className="text-2xl font-bold md:text-4xl lg:text-6xl/none pt-16">
                  Boost Your GitHub Productivity 
                </h2>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 ">
          <div className="container  px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Premium Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-gray-900 text-white border-gray-800">
                <CardHeader>
                  <LineChart className="h-10 w-10 mb-2 text-green-500" />
                  <CardTitle>Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Gain deep insights into your coding habits with detailed charts and statistics.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 text-white border-gray-800">
                <CardHeader>
                  <Calendar className="h-10 w-10 mb-2 text-green-500" />
                  <CardTitle>Custom Streak Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Set personalized streak goals and receive notifications to stay on track.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 text-white border-gray-800">
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2 text-green-500" />
                  <CardTitle>Productivity Boosters</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Access productivity tips and challenges to enhance your coding efficiency.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Choose Your Plan
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-gray-800 text-white border-gray-700">
                <CardHeader>
                  <CardTitle >Basic</CardTitle>
                  <CardDescription className="text-gray-300">For casual coders</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold ">$0</p>
                  <p className="text-sm text-gray-300">per month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Basic streak tracking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Public profile
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="bg-gray-800 text-white border-green-500">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription className="text-gray-300">For serious developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$9.99</p>
                  <p className="text-sm text-gray-300">per month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      All Basic features
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Advanced Analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Custom Streak Goals
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Upgrade to Pro</Button>
                </CardFooter>
              </Card>
              <Card className="bg-gray-800  text-white border-gray-700">
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                  <CardDescription className="text-gray-300">For collaborative teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$29.99</p>
                  <p className="text-sm text-gray-300">per month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      All Pro features
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Team Dashboards
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Collaboration Tools
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-700">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Boost Your Productivity?
              </h2>
              <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
                Join thousands of developers who have improved their GitHub streaks with our premium features.
              </p>
              <Button className="bg-white text-green-700 hover:bg-gray-100">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800 bg-gray-900">
        <p className="text-xs text-gray-400">©2025 StreakTracker. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

