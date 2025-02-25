import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import React from 'react'

const CourseTab = () => {
  return (
    <Card>
        <Card.Header>
            <div>
                <CardTitle>
                    Basic Course Information
                </CardTitle>
                <CardDescription>
                    Make changes to the course here.Click save when you're done.
                </CardDescription>
            </div>
            <div>
                <Button>
                    
                </Button>
            </div>
        </Card.Header>
    </Card>
  )
}

export default CourseTab