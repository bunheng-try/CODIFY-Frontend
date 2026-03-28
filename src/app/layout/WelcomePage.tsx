import { useNavigate, useOutletContext } from "react-router-dom";
import { HomeIcon, Library, Plus, Users } from "lucide-react";

import { EmptyState } from "@/shared/components/empty_state/EmptyState";
import { useClassrooms } from "@/features/classes/hooks/useClassroomQuery";
import { useAuthStore } from "@/app/store/autStore";
import { Card, CardContent, CardHeader, CardMeta, CardStatItem } from "@/shared/components/design/Card";
import { Button } from "@/shared/components/ui/button";

type AppShellOutletContext = {
    openCreateClass: () => void;
};

const WelcomePage = () => {
    const navigate = useNavigate();
    const { data: classes = [], isLoading } = useClassrooms();
    const currentUser = useAuthStore((s) => s.user);
    const { openCreateClass } = useOutletContext<AppShellOutletContext>();

    const firstName =
        currentUser?.name?.split(" ")[0] ||
        currentUser?.email?.split("@")[0] ||
        "there";

    if (isLoading) {
        return (
            <main className="flex-1 overflow-y-auto bg-background">
                <div className="mx-auto max-w-6xl p-6">
                    <div className="space-y-4">
                        <div className="h-8 w-64 rounded-md bg-muted animate-pulse" />
                        <div className="h-4 w-96 rounded-md bg-muted animate-pulse" />
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (classes.length === 0) {
        return (
            <main className="flex-1 overflow-y-auto bg-background">
                <div className="flex h-full items-center justify-center p-6">
                    <EmptyState
                        variant="hero"
                        icon={<HomeIcon className="w-12 h-12 text-[hsl(var(--primary))]" />}
                        title="Welcome to Codify!"
                        description="Create your first classroom or explore the challenge library to get started."
                        actionLabel="Create Classroom"
                        onAction={openCreateClass}
                    />
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-y-auto bg-background">
            <div className="mx-auto max-w-6xl space-y-8 p-6">
                <section className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, {firstName} 👋
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your classrooms and continue learning with Codify.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg font-semibold">Quick Actions</h2>
                    <div className="flex flex-wrap gap-3">
                        <Button onClick={openCreateClass}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Classroom
                        </Button>

                        <Button variant="outline" onClick={() => navigate("/challenge-library")}>
                            <Library className="mr-2 h-4 w-4" />
                            Explore Challenges
                        </Button>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Your Classrooms</h2>
                        <span className="text-sm text-muted-foreground">
                            {classes.length} {classes.length === 1 ? "classroom" : "classrooms"}
                        </span>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {classes.map((cls) => (
                            <Card
                                key={cls.id}
                                onClick={() => navigate(`/classrooms/${cls.id}`)}
                                className="min-h-[140px]"
                            >
                                <CardHeader title={cls.name} />
                                <CardContent className="justify-between h-full">
                                    <p className="text-sm text-muted-foreground">
                                        Open this classroom to view assignments, students, and activities.
                                    </p>

                                    <CardMeta className="pt-3">
                                        <CardStatItem
                                            icon={Users}
                                            label="Open classroom"
                                            withBg
                                        />
                                    </CardMeta>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default WelcomePage;