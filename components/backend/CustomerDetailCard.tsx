import { CalendarIcon, User, Mail, MapPinIcon, PhoneIcon, TagIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import CustomerTenure from '../common/CustomerTenure'

interface Address {
    city: string
    state: string
    pincode: string
}

interface Tag {
    name: string
}

interface Customer {
    id: string
    firstName?: string
    lastName?: string
    email?: string
    phoneNumber?: string
    address?: Address
    notes?: string
    tags?: Tag[]
    lifetimeValue?: number
    createdAt?: string
}

export default function CustomerDetailCard({ customer }: { customer: Customer }) {
    const { firstName, lastName, email, phoneNumber, address, notes, tags, lifetimeValue, createdAt } = customer || {}

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16 rounded-full overflow-hidden">
                        <AvatarFallback className="text-3xl font-semibold bg-primary text-primary-foreground rounded-full overflow-hidden">
                            <User size={50}/>
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl font-bold capitalize">{firstName} {lastName}</CardTitle>
                        <p className="text-sm text-muted-foreground"><CustomerTenure createdAt={createdAt} /></p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <h3 className="text-lg font-semibold">Contact Information</h3>
                    <div className="grid gap-2 text-sm">
                        <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                            {email ? (
                                <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
                            ) : "No e-mail address"}
                        </div>
                        <div className="flex items-center">
                            <PhoneIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                            {phoneNumber ? (
                                <a href={`tel:${phoneNumber}`} className="text-primary hover:underline">{phoneNumber}</a>
                            ) : "No Phone"}
                        </div>
                        {address && (address.city || address.state || address.pincode) && (
                            <div className="flex items-start">
                                <MapPinIcon className="w-4 h-4 mr-2 mt-1 text-muted-foreground" />
                                <span>
                                    {[address.city, address.state, address.pincode].filter(Boolean).join(', ')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                {notes && (
                    <div className="grid gap-2">
                        <h3 className="text-lg font-semibold">Notes</h3>
                        <p className="text-sm">{notes}</p>
                    </div>
                )}
                {tags && tags.length > 0 && (
                    <div className="grid gap-2">
                        <h3 className="text-lg font-semibold">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="flex items-center">
                                    <TagIcon className="w-3 h-3 mr-1" />
                                    {tag.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
                <div className="grid gap-2">
                    <h3 className="text-lg font-semibold">Lifetime Value</h3>
                    <p className="text-2xl font-bold text-primary">${lifetimeValue ? lifetimeValue.toLocaleString() : "Null"}</p>
                </div>
            </CardContent>
        </Card>
    )
}